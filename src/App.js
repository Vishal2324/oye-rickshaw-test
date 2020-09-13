import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import FileUpload from "./components/fileUpload";
import Table from "./components/table";
import RemarkModal from "./components/remarkModal";
import './App.css';

function App() {
	const [sheetData, updateSheetData] = useState([]);
	const [modalOpen, handleModalOpen] = useState(false);
	const [rejectIdx, setRejectIdx] = useState(null);
	const fileUpload = useRef(null);

	const handleChange = () => {
		const reader = new FileReader();
		reader.onload = (evt) => {
			const bstr = evt.target.result;
			const wb = XLSX.read(bstr, {type:'binary'});
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			let data = XLSX.utils.sheet_to_csv(ws, {header:1});
			data = data.split(/\r?\n/).map(x => ({ data: x, selected: false }));
			updateSheetData(data);
		};
		reader.readAsBinaryString(fileUpload.current.files[0]);
	}

	const handleSelectionChange = (idx, e) => {
		const newSheetData = [ ...sheetData ];
		newSheetData[idx].selected = e.target.checked;
		updateSheetData(newSheetData);
	}

	const handleApprove = (idx) => {
		const newSheetData = [ ...sheetData ];
		newSheetData[idx].approved = true;
		updateSheetData(newSheetData);		
	}

	const openModalChange = (idx, open) => {
		handleModalOpen(open);
		setRejectIdx(idx);
	}

	const handleReject = (idx, remark) => {
		const newSheetData = [ ...sheetData ];
		newSheetData[idx].rejected = true;
		newSheetData[idx].remark = remark;
		updateSheetData(newSheetData);	
		handleModalOpen(false);	
		console.log(newSheetData[idx]);
	}

	const handleApproveAll = () => {
		const newSheetData = [ ...sheetData ];
		const selectedRow = []
		newSheetData.forEach(row => {
			if(row.selected === true){
				row.approved = true;
				row.rejected = false;
				row.remark = null
				selectedRow.push(row);
			}
		})
		updateSheetData(newSheetData);		
		console.log(selectedRow);
	}

	return (
		<div className="App"> 
			<FileUpload 
				ref={fileUpload}
				onChange={handleChange}
			/>
			{sheetData.length > 0 && <div>
				<div>selected row: {sheetData.filter(x => x.selected === true).length}</div>
				<button onClick={handleApproveAll} style={{right: "100px", position: "absolute", top: "50px"}}>Approve Selected</button>
				<br/>
				<Table 
					data={sheetData}  
					handleSelectionChange={handleSelectionChange}
					handleApprove={handleApprove}
					handleReject={openModalChange}
				/>
				<RemarkModal 
					open={modalOpen} 
					closeModal={openModalChange} 
					handleReject={handleReject}
					idx={rejectIdx}
				/>
			</div>}
		</div>
	);
}

export default App;
