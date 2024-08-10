export enum MessagePatternTypes {
  // Deliver Jokes Service
  DELIVER_SVC_FETCH_JOKE_TYPES = 'deliver.fetch.jokeTypes',
  DELIVER_SVC_FETCH_JOKE_TYPE_BY_ID = 'deliver.fetch.jokeType.byId',
  DELIVER_SVC_INSERT_JOKE = 'deliver.insert.joke',

  // Submit Jokes service
  SUBMIT_SVC_GET_NEW_JOKES = 'submit.get.jokes',
  SUBMIT_SVC_MARK_ACCEPTED = 'submit.update.accepted',
  SUBMIT_SVC_DELETE = 'submit.delete.joke',
}

export enum Services {
  DELIVER_JOKES_SERVICE = 'DELIVER_JOKES_SERVICE',
  MODERATE_JOKES_SERVICE = 'MODERATE_JOKES_SERVICE',
  SUBMIT_JOKES_SERVICE = 'SUBMIT_JOKES_SERVICE',
}
