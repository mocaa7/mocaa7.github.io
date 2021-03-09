import React from "react";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../../node_modules/font-awesome/css/font-awesome.min.css';
import '../CourseEditor.css'
import '../../CourseManager/CourseManager.css'

const SaveAndPreviewComponent = ({ saveAll, isPreviewing, updatePreview }) =>
	<div className={"row col-sm-10"}>
		<div id="wbdv-preview">
			<button type="button" className="btn btn-success" id={"wbdv-save"} onClick={() => saveAll()}>
				Save All</button>
		</div>
		<div className="custom-control custom-switch wbdv-preview">
			<input type="checkbox"
				className="custom-control-input wbdv-preview-icon"
				id="customSwitch"
				checked={isPreviewing}
				onChange={() => updatePreview()} />
			<label className="custom-control-label wbdv-preview"
				htmlFor="customSwitch">Preview</label>
		</div>
	</div>;

export default SaveAndPreviewComponent;