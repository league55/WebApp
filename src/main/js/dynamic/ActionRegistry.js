function callWithPreventDefault(func, eventArg) {
  eventArg.preventDefault();
  func();
}

/**
 * Action registry to map action from configuration file to real redux action
 */
class ActionRegistry {

  /**
   * Populate common properties for actions
   * @param {String} properties component properties
   * @param {React.Component} actions redux actions
   * @returns {*} properties for action
   */
  static getActionProperties(properties, actions) {
    if (!properties || !properties.action) {
      return {};
    }

    switch (properties.action) {
      case "saveArticle" :
        return {
          onClick: callWithPreventDefault.bind(null, actions.saveArticle)
        };
      default:
        throw new Error("unknown form action " + properties.action);
    }
  }
}

export default ActionRegistry;
