import React from "react";
import {connect} from "react-redux";
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../components/CourseEditor/CourseEditor.css';
import '../components/CourseManager/CourseManager.css';
import {createModule, deleteModule, findAllModulesForCourse, updateModule} from '../actions/moduleActions'
import ModuleService from '../services/ModuleService';
import ModuleListItemComponent from '../components/CourseEditor/ModuleListItemComponent';

const service = new ModuleService();

class ModuleListContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedModuleId: props.curModuleId,
      modules: [],
    };
  }

  componentDidMount() {
    this.updateModules();
  }

  async updateModules() {
    const modules = await service.findModulesForCourse(this.props.courseId);
    this.setState({modules: modules});
  }

  async addModule() {
    await this.props.createModule(this.props.courseId);
    await this.updateModules();
  }

  onSelect(moduleId) {
    this.setState({selectedModuleId: moduleId});
    this.props.history.push(`/course/${this.props.courseId}/module/${moduleId}`);
  }

  async onDelete(moduleId) {
    this.setState({selectedModuleId: moduleId});
    await this.props.deleteModule(moduleId);
    await this.updateModules();
  }

  async onSave(moduleId, newModule) {
    await this.props.updateModule(moduleId, newModule);
    await this.updateModules();
  }


  render() {
    return (
      <div>
        <ul className="list-group">
            {this.state.modules && this.state.modules.map(module =>
              <ModuleListItemComponent
                key={module._id}
                isSelected={module._id === this.state.selectedModuleId}
                module={module}
                onSelect={this.onSelect.bind(this, module._id)}
                onDelete={this.onDelete.bind(this, module._id)}
                onSave={this.onSave.bind(this, module._id)}/>
            )}
        </ul>
        <i className="fa fa-plus-circle fa-3x wbdv-add"
          onClick={() => this.addModule()}/>
      </div>
    );
  }
}

const stateToPropertyMapper = (state) => {
  return {modules: state.modules.modules}
};

const dispatchToPropertyMapper = (dispatch) => {
  return {
    createModule: (courseId) =>
      service.createModule(courseId, {title: 'New module'})
      .then(actualModule =>
          dispatch(createModule(actualModule, courseId))),

    findAllModulesForCourse: (courseId) =>
      service.findModulesForCourse(courseId)
      .then(actualModules =>
          dispatch(findAllModulesForCourse(actualModules))),

    updateModule: (moduleId, module) =>
      service.updateModule(moduleId, module)
      .then(updatedModule =>
          dispatch(updateModule(updatedModule))),

    deleteModule: (moduleId) =>
      service.deleteModule(moduleId)
      .then(status =>
          dispatch(deleteModule(moduleId)))
  }
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(ModuleListContainer)