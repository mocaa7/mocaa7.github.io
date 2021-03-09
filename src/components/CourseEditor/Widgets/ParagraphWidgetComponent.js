import React from "react";
import WidgetBarComponent from "./WidgetBarComponent";

const PARAGRAPH_TYPE = 'Paragraph';

class ParagraphWidgetComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      widget: props.widget,
      text: props.text,
      name: props.name,
      widgetOrder: props.widgetOrder
    }
    this.state.widget.name = this.props.name;
    this.state.widget.text = this.props.text;
    this.state.widget.widgetOrder = this.props.widgetOrder;
    this.state.widget.widgetType = PARAGRAPH_TYPE;
  }

  updateWidgetContent(newText) {
    this.state.widget.text = newText;
    this.props.updateWidget(this.state.widget);
    this.setState({ text: newText });
  }

  updateWidgetName(newName) {
    this.state.widget.name = newName;
    this.props.updateWidget(this.state.widget);
    this.setState({ name: newName });
  }

  render() {
    return (
      <span>
        {!this.props.isPreviewing &&
          <span>
            <WidgetBarComponent
              key={this.props.widget.id}
              type={PARAGRAPH_TYPE}
              widget={this.props.widget}
              widgetOrder={this.props.widgetOrder}
              getLastElement={this.props.getLastElement}
              moveUp={this.props.moveUp}
              moveDown={this.props.moveDown}
              updateWidget={this.props.updateWidgetType}
              onDelete={this.props.onDelete} />
            <div className="form-group row">
              <div className="col-sm-10">
                <textarea
                  type="text"
                  className="form-control wbdv-placeholder"
                  placeholder="Paragraph text"
                  defaultValue={this.props.text}
                  onChange={(e) => this.updateWidgetContent(e.target.value)} />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-10">
                <input className="form-control wbdv-placeholder"
                  placeholder="Widget name"
                  defaultValue={this.state.name}
                  onChange={(e) => this.updateWidgetName(e.target.value)} />
              </div>
            </div>

            <div className="form-group row">
              <h4 className="col-sm-10">Preview</h4>
            </div>
          </span>
        }
        <div className="form-group row">
          {this.state.text}
        </div>
      </span>
    )
  }
}

export default ParagraphWidgetComponent;