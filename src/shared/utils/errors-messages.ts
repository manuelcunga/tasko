export enum messages {
  Unauthenticated = 'Email ou palavra-passe errada!',
  userAlreadyExists = 'Ops, usuário já existe!',
  invalidEmail = 'Ops, email inválido',
  userNotFound = 'Usuário não encontrado',
  addressNotfound = 'Endereço não encontrado',
  InternalServerError = 'Ops, houve um erro interno, tente novamente mais tarde',
  ForbiddenEndpoint = 'Você não tem permissão para acessar este recurso. Verifique suas permissões e tente novamente.',
  InvalidTransactionOperation = 'Transaction is already deleted.',
  InvalidTransactionUpdate = 'Cannot update description of a deleted transaction.',
}