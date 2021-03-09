import {
  CREATE_WIDGET,
  DELETE_WIDGET,
  UPDATE_WIDGET,
  FIND_ALL_WIDGETS_FOR_TOPIC,
  MOVE_WIDGET_UP,
  MOVE_WIDGET_DOWN,
  SAVE_ALL_WIDGETS
} from '../actions/widgetActions';

const widgetReducer = (state = { widgets: [] }, action) => {
  switch (action.type) {

    case FIND_ALL_WIDGETS_FOR_TOPIC:
      return { widgets: action.widgets };

    case CREATE_WIDGET:
      return {
        widgets: [...state.widgets,
        { name: action.name, widgetType: action.widgetType, id: action.id }]
      };

    case DELETE_WIDGET:
      return { widgets: state.widgets.filter(widget => widget.id !== action.widgetId) }

    case UPDATE_WIDGET:
      return {
        widgets: state.widgets.map(widget =>
          widget.id === action.widget.id ? action.widget : widget)
      };
    
      case MOVE_WIDGET_UP:
      action.widget.widgetOrder--;
      action.other.widgetOrder++;
      return {
        widgets: state.widgets.map(widget =>
          widget.id === action.other.id ? action.widget :
            (widget.id === action.widget.id ? action.other : widget))
      };

    case MOVE_WIDGET_DOWN:
      action.widget.widgetOrder++;
      action.other.widgetOrder--;

      return {
        widgets: state.widgets.map(widget =>
          widget.id === action.widget.id ? action.other :
            (widget.id === action.other.id ? action.widget : widget))
      };

    case SAVE_ALL_WIDGETS:
      return { widgets: action.widgets };

    default:
      return state
  }
};

export default widgetReducer;