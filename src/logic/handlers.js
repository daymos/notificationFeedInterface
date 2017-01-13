import * as _ from 'ramda';

export const  updateState = (id, state) => {
  let findObject = _.find(_.propEq('invite_id', id))
  let update = _.curry((update, original) => Object.assign(original, update))
  let findIndex = _.findIndex(_.propEq('invite_id', id))
  let getUpdatedObject = _.compose(update({status: 'read'}), findObject)(state)

  return _.update(_.findIndex(_.propEq('invite_id', id)), getUpdatedObject, state)
}
