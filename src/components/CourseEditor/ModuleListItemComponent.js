import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './CourseEditor.css'

class ModuleListItemComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      title: props.module.title
    };
  }

  onEdit() {
    this.setState({isEditing: true});
    this.props.onSelect();
  }

  onChange(event) {
    this.setState({title: event.target.value});
  }

  onSave() {
    const newModule = {...this.props.module, title: this.state.title};
    this.props.onSave(newModule);
    this.setState({isEditing: false});
  }

  render() {
    return (
      <li className={`list-group-item wbdv-module-item wbdv-module-item-title
        ${this.props.isSelected ? 'active' : ''}`}
        onClick={() => this.props.onSelect()} key={module._id}>
        
        {!this.state.isEditing &&
          <div>
            <span>{this.state.title}</span>
            <span className="float-right">
              <i className="fa fa-pencil fa-2x" onClick={() => this.onEdit()}/>
            </span>
          </div>
        }
        {this.state.isEditing &&
          <div>
            <input type="text" className="typing-container"
              value={this.state.title}
              onChange={(e) => this.onChange(e)}/>
            
            <span className="float-right">
              <i className="fa fa-trash fa-2x" onClick={() => this.props.onDelete()}/>
              <i className="fa fa-check fa-2x" onClick={() => this.onSave()}/>
            </span>
          </div>
        }
      </li>
    );
  }
}

export default ModuleListItemComponent;
