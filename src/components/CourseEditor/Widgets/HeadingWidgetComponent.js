import React from "react";
import WidgetBarComponent from "./WidgetBarComponent";

const HEADING_TYPE = 'Heading';

const Heading = ({ size, text }) =>
  <div className="form-group row">
    {size === 1 && <h1>{text}</h1>}
    {size === 2 && <h2>{text}</h2>}
    {size === 3 && <h3>{text}</h3>}
    {size === 4 && <h4>{text}</h4>}
    {size === 5 && <h5>{text}</h5>}
    {size === 6 && <h6>{text}</h6>}
  </div>;

class HeadingWidgetComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      widget: props.widget,
      size: props.size,
      name: props.name,
      text: props.text,
      widgetOrder: props.widgetOrder
    };
    this.state.widget.size = this.props.size;
    this.state.widget.name = this.props.name;
    this.state.widget.text = this.props.text;
    this.state.widget.widgetOrder = this.props.widgetOrder;
    this.state.widget.widgetType = HEADING_TYPE;
  }

  updateWidgetContent(newText) {
    this.state.widget.text = newText;
    this.props.updateWidget(this.state.widget);
    this.setState({ text: newText });
  }

  updateHeadingSize(heading) {
    let c = heading[heading.length - 1];
    let newSize = parseInt(c);
    this.state.widget.size = newSize;
    this.props.updateWidget(this.state.widget);
    this.setState({ size: newSize });
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
              type={HEADING_TYPE}
              widget={this.props.widget}
              widgetOrder={this.props.widgetOrder}
              getLastElement={this.props.getLastElement}
              moveUp={this.props.moveUp}
              moveDown={this.props.moveDown}
              updateWidget={this.props.updateWidgetType}
              onDelete={this.props.onDelete}/>
            <div className="form-group row">
              <div className="col-sm-10">
                <input className="form-control wbdv-placeholder"
                  placeholder="Heading text"
                  defaultValue={this.props.text}
                  onChange={(e) => this.updateWidgetContent(e.target.value)} />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-10">

                <select className="form-control"
                  defaultValue={`Heading ${this.props.size}`}
                  onChange={(e) => this.updateHeadingSize(e.target.value)}>
                  <option>Heading 1</option>
                  <option>Heading 2</option>
                  <option>Heading 3</option>
                  <option>Heading 4</option>
                  <option>Heading 5</option>
                  <option>Heading 6</option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-10">
                <input className="form-control wbdv-placeholder"
                  defaultValue={this.props.name}
                  placeholder="Widget name"
                  onChange={(e) => this.updateWidgetName(e.target.value)} />
              </div>
            </div>

            <div className="form-group row">
              <h4 className="col-sm-10">Preview</h4>
            </div>
          </span>
        }
        <Heading
          size={this.state.size}
          text={this.state.text}
        />
      </span>
    )
  }
}

export default HeadingWidgetComponent;