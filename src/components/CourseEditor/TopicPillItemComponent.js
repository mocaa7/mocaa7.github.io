import React from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './CourseEditor.css'

class TopicPillItemComponent extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      title: props.topic.title
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
    const newTopic = {...this.props.topic, title: this.state.title};
    this.props.onSave(newTopic);
    this.setState({isEditing: false});
  }

  render() {
    return (
      <li className={`nav-item nav-link ${this.props.isSelected ? 'active' : ''}`}
          onClick={() => this.props.onSelect()} key={this.props.topic.id}>
          {!this.state.isEditing && 
            <div>
              {this.state.title}
              <i className="fa fa-pencil" onClick={() => this.onEdit()}/>
            </div>}

          {this.state.isEditing && 
            <div>
              <input type="text" className="typing-container"
                value={this.state.title}
                onChange={(e) => this.onChange(e)}/>

              <span className="float-right">
                <i className="fa fa-trash" onClick={() => this.props.onDelete()}/>
                <i className="fa fa-check" onClick={() => this.onSave()}/>
              </span>
            </div>
          }
      </li>
    );
  }
}

export default TopicPillItemComponent;