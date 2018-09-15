const BaseAction = require('../BaseAction')
const UserDAO = require('../../dao/UserDAO')
const { checkAccessUpdateUserService } = require('../../services/security')

class RemoveAction extends BaseAction {
  static get accessTag () {
    return 'users:remove'
  }

  static async run (req, res, next) {
    const model = await UserDAO.BaseGetById(+req.params.id)
    await checkAccessUpdateUserService(model)
    await UserDAO.BaseRemove(+req.params.id)
    res.json(this.resJson({ message: `${req.params.id} was removed` }))
  }
}

module.exports = RemoveAction
