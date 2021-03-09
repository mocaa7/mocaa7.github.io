export const CREATE_WIDGET = 'CREATE_WIDGET';
export const DELETE_WIDGET = 'DELETE_WIDGET';
export const FIND_ALL_WIDGETS_FOR_TOPIC = 'FIND_ALL_WIDGETS_FOR_TOPIC';
export const UPDATE_WIDGET = 'UPDATE_WIDGET';
export const MOVE_WIDGET_UP = 'MOVE_WIDGET_UP';
export const MOVE_WIDGET_DOWN = 'MOVE_WIDGET_DOWN';
export const SAVE_ALL_WIDGETS = 'SAVE_ALL_WIDGETS';


export const createWidget = (topicId, widgetId) => ({
  name: 'New Widget',
  widgetType: 'Heading',
  id: widgetId,
  // id:(new Date()).getTime(), // TODO, replace with next id
  topicId: topicId,
  type: CREATE_WIDGET,
});

export const deleteWidget = (widgetId) => ({
  type: DELETE_WIDGET,
  widgetId: widgetId,
});

export const findAllWidgetsForTopic = (widgets) => ({
  type: FIND_ALL_WIDGETS_FOR_TOPIC,
  widgets: widgets
});

export const updateWidget = (widget) => ({
  type: UPDATE_WIDGET,
  widget: widget
});

export const moveWidgetUp = (widget, other) => ({
  type: MOVE_WIDGET_UP,
  widget: widget,
  other: other
});

export const moveWidgetDown = (widget, other) => ({
  type: MOVE_WIDGET_DOWN,
  widget: widget,
  other: other
});

export const saveAllWidgets = (widgets) => ({
  widgets: widgets,
  type: SAVE_ALL_WIDGETS
});

export default {
  CREATE_WIDGET, DELETE_WIDGET, FIND_ALL_WIDGETS_FOR_TOPIC, UPDATE_WIDGET, MOVE_WIDGET_UP, MOVE_WIDGET_DOWN, SAVE_ALL_WIDGETS,
  deleteWidget, createWidget, findAllWidgetsForTopic, updateWidget, moveWidgetUp, moveWidgetDown, saveAllWidgets
}