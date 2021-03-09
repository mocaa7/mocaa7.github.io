import React from "react";
import WidgetBarComponent from "./WidgetBarComponent";

const LIST_TYPE = 'List';
const ORDERED = 'Ordered list';
const UNORDERED = 'Unordered list';

class ParagraphWidgetComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			widget: props.widget,
			items: props.items || [],
			name: props.name,
			ordered: props.widget.ordered,
			widgetOrder: props.widgetOrder
		}

		this.state.widget.name = this.props.name;
		this.state.widget.items = this.props.items;
		this.state.widget.widgetOrder = this.props.widgetOrder;
		this.state.widget.widgetType = LIST_TYPE;
	}

	updateWidgetItems(newItemText) {
		let curItems = newItemText ? newItemText.split('\n') : [];
		this.state.widget.items = curItems;
		this.props.updateWidget(this.state.widget);
		this.setState({ items: curItems });
	}

	updateWidgetName(newName) {
		this.state.widget.name = newName;
		this.props.updateWidget(this.state.widget);
		this.setState({ name: newName });
	}

	changeOrder(newSelection) {
		let isOrdered = (newSelection === ORDERED) ? true : false;
		this.state.widget.ordered = isOrdered;
		this.props.updateWidget(this.state.widget);
		this.setState({ ordered: isOrdered });
	}

	render() {
		return (
			<span>
				{!this.props.isPreviewing &&
					<span>
						<WidgetBarComponent
							key={this.props.widget.id}
							type={LIST_TYPE}
							widget={this.props.widget}
							widgetOrder={this.props.widgetOrder}
							getLastElement={this.props.getLastElement}
							moveUp={this.props.moveUp}
							moveDown={this.props.moveDown}
							updateWidget={this.props.updateWidgetType}
							onDelete={this.props.onDelete} />
						<div className="form-group row">
							<div className="col-sm-10">
								<textarea type="text"
									className="form-control wbdv-placeholder"
									placeholder="Enter one list item per line"
									defaultValue={this.props.items.join('\n')}
									onChange={(e) => this.updateWidgetItems(e.target.value)} />
							</div>
						</div>

						<div className="form-group row">
							<div className="col-sm-10">

								<select className="form-control"
									defaultValue={this.state.ordered ? ORDERED : UNORDERED}
									onChange={(e) => this.changeOrder(e.target.value)}>
									<option>{ORDERED}</option>
									<option>{UNORDERED}</option>
								</select>
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
					{this.state.items &&
						<span>
							{this.state.ordered && <ol>{this.state.items.map(item => <li>{item}</li>)}</ol>}
							{!this.state.ordered && <ul>{this.state.items.map(item => <li>{item}</li>)}</ul>}
						</span>}
				</div>
			</span>
		)
	}
}

export default ParagraphWidgetComponent;