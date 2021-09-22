
import { ConsoleUI } from '../view/ConsoleUI.js'
import { TestController } from './TestController.js'

const controller = new TestController()
const ui = new ConsoleUI()

controller.start(ui)
