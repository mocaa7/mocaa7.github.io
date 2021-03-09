import React from "react";
import WidgetBarComponent from "./WidgetBarComponent";

const IMAGE_TYPE = 'Image';

class ImageWidgetComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			widget: props.widget,
			name: props.name,
			url: props.url,
			widgetOrder: props.widgetOrder
		};
		this.state.widget.name = this.props.name;
		this.state.widget.url = this.props.url;
		this.state.widget.widgetOrder = this.props.widgetOrder;
		this.state.widget.widgetType = IMAGE_TYPE;
	}

	updateWidgetUrl(newUrl) {
		this.state.widget.url = newUrl;
		this.props.updateWidget(this.state.widget);
		this.setState({ url: newUrl });
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
							type={IMAGE_TYPE}
							widget={this.props.widget}
							widgetOrder={this.props.widgetOrder}
							getLastElement={this.props.getLastElement}
							moveUp={this.props.moveUp}
							moveDown={this.props.moveDown}
							updateWidget={this.props.updateWidgetType}
							onDelete={this.props.onDelete} />
						<div className="form-group row">
							<div className="col-sm-10">
								<input className="form-control wbdv-placeholder"
									placeholder="Image URL"
									defaultValue={this.props.url}
									onChange={(e) => this.updateWidgetUrl(e.target.value)} />
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
				<img src={this.state.url} />
			</span>
		)
	}
}

export default ImageWidgetComponent;