import React from "react";
import { connect } from "react-redux";
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../components/CourseEditor/CourseEditor.css';
import '../components/CourseManager/CourseManager.css';
import { createWidget, deleteWidget, findAllWidgetsForTopic, updateWidget, saveAllWidgets, moveWidgetUp, moveWidgetDown } from '../actions/widgetActions';
import WidgetService from '../services/WidgetService';
import HeadingWidgetComponent from '../components/CourseEditor/Widgets/HeadingWidgetComponent';
import ParagraphWidgetComponent from '../components/CourseEditor/Widgets/ParagraphWidgetComponent';
import ListWidgetComponent from '../components/CourseEditor/Widgets/ListWidgetComponent';
import ImageWidgetComponent from "../components/CourseEditor/Widgets/ImageWidgetComponent";
import SaveAndPreviewComponent from '../components/CourseEditor/Widgets/SaveAndPreviewComponent';

const service = new WidgetService();

const headingWidget = (id, widgetOrder) => {
  return { id: id, name: "", widgetType: HEADING, widgetOrder: widgetOrder, width: -1, height: -1, cssClass: "", style: "", value: "", text: "", size: DEFAULT_SIZE };
}

const HEADING = 'Heading';
const PARAGRAPH = 'Paragraph';
const IMAGE = 'Image';
const LIST = 'List';
const DEFAULT_SIZE = 1;

class WidgetListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      widgets: [],
      nextId: -1,
      isPreviewing: false
    };

    this.updateWidgets();
  }

  getLastElement() {
    return this.state.widgets.length - 1;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topicId !== this.props.topicId) {
      this.updateWidgets();
    }
  }

  async onSaveAll() {
    await this.props.saveAllWidgets(this.props.topicId, this.state.widgets);
  }

  async updateWidgets() {
    const widgets = await service.findWidgetsForTopic(this.props.topicId);
    this.setState({ widgets: widgets });
  }

  async addWidget() {
    let newId = this.state.nextId;
    this.setState({ nextId: --this.state.nextId });
    // let newWidget = headingWidget((new Date()).getTime(), this.state.widgets.length);
    let newWidget = headingWidget(newId, this.state.widgets.length);
    this.setState({ widgets: [...this.state.widgets, newWidget] });
    // this.props.createWidget(this.props.topicId, widgetId);
  }

  onDelete(widgetId) {
    let newWidgets = this.state.widgets.filter(widget => widget.id !== widgetId);
    this.setState({ widgets: newWidgets });
    // this.props.deleteWidget(widgetId);
  }

  swapElements(widgets, x, y) {
    let temp = widgets[x];
    widgets[x] = widgets[y];
    widgets[y] = temp;
    widgets[x].widgetOrder = x;
    widgets[y].widgetOrder = y;
    return widgets;
  }

  async moveUp(widget) {
    let index = this.state.widgets.indexOf(widget);
    this.setState(
      { widgets: this.swapElements(this.state.widgets, index, index - 1) });
    // this.props.moveWidgetUp(widget, this.state.widgets[index - 1]);
  }

  async moveDown(widget) {
    let index = this.state.widgets.indexOf(widget);
    this.setState(
      { widgets: this.swapElements(this.state.widgets, index, index + 1) });
    // this.props.moveWidgetDown(widget, this.state.widgets[index + 1]);
  }

  updateWidget(newWidget) {
    this.setState({
      widgets: this.state.widgets.map(widget =>
        widget.id === newWidget.id ? newWidget : widget)
    });
  }

  updatePreview() {
    this.setState({ isPreviewing: !this.state.isPreviewing });
  }

  render() {
    return (
      <span>
        <SaveAndPreviewComponent
          key={this.props.topicId}
          saveAll={this.onSaveAll.bind(this)}
          isPreviewing={this.state.isPreviewing}
          updatePreview={this.updatePreview.bind(this)} />
        <div>
          {this.state.widgets && this.state.widgets.map((widget, index) =>
            <div>
              <div className={"col container fluid wbdv-widget info"}>
                {(!widget.widgetType || widget.widgetType === HEADING) &&
                  <HeadingWidgetComponent
                    key={widget.id}
                    widget={widget}
                    widgetOrder={index}
                    getLastElement={this.getLastElement.bind(this)}
                    moveUp={this.moveUp.bind(this, widget)}
                    moveDown={this.moveDown.bind(this, widget)}
                    onDelete={this.onDelete.bind(this, widget.id)}
                    size={widget.size ? widget.size : DEFAULT_SIZE}
                    name={widget.name || ''}
                    text={widget.text || ''}
                    updateWidget={this.updateWidget.bind(this, widget)}
                    updateWidgetType={this.updateWidget.bind(this)}
                    isPreviewing={this.state.isPreviewing} />}

                {widget.widgetType === PARAGRAPH &&
                  <ParagraphWidgetComponent
                    key={widget.id}
                    widget={widget}
                    widgetOrder={index}
                    getLastElement={this.getLastElement.bind(this)}
                    moveUp={this.moveUp.bind(this, widget)}
                    moveDown={this.moveDown.bind(this, widget)}
                    onDelete={this.onDelete.bind(this, widget.id)}
                    name={widget.name || ''}
                    text={widget.text || ''}
                    updateWidget={this.updateWidget.bind(this, widget)}
                    updateWidgetType={this.updateWidget.bind(this)}
                    isPreviewing={this.state.isPreviewing} />}

                {widget.widgetType === LIST &&
                  <ListWidgetComponent
                    key={widget.id}
                    widget={widget}
                    widgetOrder={index}
                    getLastElement={this.getLastElement.bind(this)}
                    moveUp={this.moveUp.bind(this, widget)}
                    moveDown={this.moveDown.bind(this, widget)}
                    onDelete={this.onDelete.bind(this, widget.id)}
                    name={widget.name || ''}
                    items={widget.items || ''}
                    updateWidget={this.updateWidget.bind(this, widget)}
                    updateWidgetType={this.updateWidget.bind(this)}
                    isPreviewing={this.state.isPreviewing} />}

                {(widget.widgetType === IMAGE) &&
                  <ImageWidgetComponent
                    key={widget.id}
                    widget={widget}
                    widgetOrder={index}
                    getLastElement={this.getLastElement.bind(this)}
                    moveUp={this.moveUp.bind(this, widget)}
                    moveDown={this.moveDown.bind(this, widget)}
                    onDelete={this.onDelete.bind(this, widget.id)}
                    name={widget.name || ''}
                    url={widget.url || ''}
                    updateWidget={this.updateWidget.bind(this, widget)}
                    updateWidgetType={this.updateWidget.bind(this)}
                    isPreviewing={this.state.isPreviewing} />}
              </div>
            </div>
          )
          }
          {!this.state.isPreviewing &&
            <div className="nav-item" onClick={() => this.addWidget()}>
              <i className="nav-link fa fa-plus-circle fa-2x" />
            </div>}
        </div>
      </span>
    )
  }
}

const stateToPropertyMapper = (state) => {
  return {
    widgets: state.widgets.widgets
  }
};

const dispatchToPropertyMapper = (dispatch) => {
  return {
    createWidget: (topicId, widgetId) =>
      dispatch(createWidget(topicId, widgetId)),

    findAllWidgetsForTopic: (topicId) =>
      service.findWidgetsForTopic(topicId)
        .then(actualWidgets =>
          dispatch(findAllWidgetsForTopic(actualWidgets))),

    updateWidget: (widget) =>
      dispatch(updateWidget(widget)),

    deleteWidget: (widgetId) =>
      dispatch(deleteWidget(widgetId)),

    saveAllWidgets: (topicId, widgets) =>
      service.saveAllWidgets(topicId, widgets)
        .then(returnedWidgets =>
          dispatch(saveAllWidgets(returnedWidgets))),

    moveWidgetUp: (widget, other) =>
      dispatch(moveWidgetUp(widget, other)),

    moveWidgetDown: (widget, other) =>
      dispatch(moveWidgetDown(widget, other))
  }
};

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper)
  (WidgetListContainer)