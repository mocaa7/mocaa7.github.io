import React from "react";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../../node_modules/font-awesome/css/font-awesome.min.css';
import '../CourseEditor.css'
import '../../CourseManager/CourseManager.css'

const HEADING = 'Heading';
const PARAGRAPH = 'Paragraph';
const IMAGE = 'Image';
const LIST = 'List';
const DEFAULT_SIZE = 1;

const headingWidget = (id, widgetOrder) => {
  return { id: id, name: "", widgetType: HEADING, widgetOrder: widgetOrder, width: -1, height: -1, cssClass: "", style: "", value: "", text: "", size: DEFAULT_SIZE };
}
const paragraphWidget = (id, widgetOrder) => {
  return { id: id, name: "", widgetType: PARAGRAPH, widgetOrder: widgetOrder, width: -1, height: -1, cssClass: "", style: "", value: "", text: "" };
}
const imageWidget = (id, widgetOrder) => {
  return { id: id, name: "", widgetType: IMAGE, widgetOrder: widgetOrder, width: -1, height: -1, cssClass: "", style: "", value: "", url: "" };
}
const listWidget = (id, widgetOrder) => {
  return { id: id, name: "", widgetType: LIST, widgetOrder: widgetOrder, width: -1, height: -1, cssClass: "", style: "", value: "", items: [], ordered: false };
}

const getWidgetByType = (widgetId, widgetOrder, type) => {
  switch(type) {
    case PARAGRAPH:
      return paragraphWidget(widgetId, widgetOrder);
    case IMAGE:
      return imageWidget(widgetId, widgetOrder);
    case LIST:
      return listWidget(widgetId, widgetOrder);
    default:
      return headingWidget(widgetId, widgetOrder);
  }
}

const WidgetBarComponent = ({ type, widget, widgetOrder, getLastElement,
  moveUp, moveDown, updateWidget, onDelete }) =>
  <div className="row wbdv-margin-below col-sm-11">
    <h3 className={"wbdv-heading-widget"}>{type} Widget</h3>
    <div className="col wbdv-edit-widget">
      <div className="row row-right">

        {
          widgetOrder > 0 &&
          <button type="button"
            className="btn btn-sm btn-outline-dark wbdv-arrow col-sm-1"
            onClick={() => moveUp()} key={widget.id}>
            <i className="fa fa-arrow-up pt-1 fa-1x" />
          </button>
        }

        {
          widgetOrder < getLastElement() &&
          <button type="button"
            className="btn btn-sm btn-outline-dark wbdv-arrow col-sm-1"
            onClick={() => moveDown()} key={widget}>
            <i className="fa fa-arrow-down pt-1 fa-1x" />
          </button>
        }

        <div className="col-sm-5">
          <select className="form-control" defaultValue={type}
            onChange={(e) => updateWidget(getWidgetByType(widget.id, widgetOrder, e.target.value))}>
            <option>Heading</option>
            <option>Paragraph</option>
            <option>Image</option>
            <option>List</option>
          </select>
        </div>
        <i className="fa fa-times fa-2x pt-1 pr-2"
          onClick={() => onDelete()} />
      </div>
    </div>
  </div>;

export default WidgetBarComponent;