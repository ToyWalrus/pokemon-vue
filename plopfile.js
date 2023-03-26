module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'Component name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{ componentName }}.vue',
        templateFile: '__templates/component.hbs',
      },
      {
        type: 'add',
        path: 'src/stories/{{ componentName }}.story.ts',
        templateFile: '__templates/story.hbs',
      },
    ],
  })
}
