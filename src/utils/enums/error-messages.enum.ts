export enum ErrorMessagesEnum {
  wrongSmsCode = 'Неверный СМС код, повторите попытку.',
  orderByIdNotFound = 'Заказ с id ?? не был найден',
  orderByPhoneNotFound = 'Заказов с номером ?? не было найдено',
  orderTrxFailed = 'Заказ не был создан, повторите попытку',
  ordersNotFound = 'Заказы не были найдены',
  brandByIdNotFound = 'Бренда с id - ?? не существует',
  categoryByIdNotFound = 'Категории с id - ?? не существует',
  wrongParentId = 'У категории с id - ??, не может быть родительской категории с таким же id',
  categoryHaveProduct = 'В категории с id - ?? присутствуют товары, сначала удалите товары',
  categoryHaveChild = 'Категория с id - ??, содержит дочерние категории, сначала удалите их',
  incorrectExt = 'Некорректное расширение файла. Доступные расширения: ??',
  fileUploadFailed = 'Произошла ошибка при сохранении файла',
  fileRemoveFailed = 'Произошла ошибка при удалении файла',
  fileByIdNotFound = 'Файла с id - ?? не существует',
  productByIdNotFound = 'Товара с id - ?? не существует',
  productsNotFound = 'Товары не найдены',
  redisClientError = 'Ошибка подключения к Redis',
  pricingByIdNotFound = 'Стоимости с id - ?? не существует',
  wrongCountRange = 'Некорректный диапазон количества товаров',
  pricingByProductIdNotFound = 'Стоимости с id товара - ?? не существует',
  promotionByIdNotFound = 'Акции с id - ?? не существует',
  callbackNotFound = 'Заявки на обратный звонок с id - ?? не существует',
  userByIdNotFound = 'Пользователя с id - ?? не существует',
  userAlreadyExists = 'Пользователь с логином \'??\' уже существует',
  unauthorized = 'Пользователь не авторизован',
  incorrectRole = 'Роль пользователя не имеет достаточно прав',
  incorrectUserData = 'Введены неверные данные',
  postgresConnection = 'Ошибка подключения к Postgres. Код ошибки - ??',
  configByIdNotFound = 'Конфигурации с id - ?? не существует',
  createConfigError = 'Ошибка при создании конфигурации',
  updateConfigError = 'Ошибка при обновлении конфигурации',
  configByKeyNotFound = 'Конфигурации с ключом - ?? не существует',
  userByPhoneNotFound = 'Пользователя с номером - ?? не существует',
  invalidSmsToken = 'Некорректный токен для подтверждения номера телефона',
  bannedPhone = 'Номер телефона - ?? заблокирован',
  invalidReqUuid = 'Неверный идентификатор запроса',
  smsApiError = 'Сервис рассылки не доступен',
  smsSendFailed = 'Ошибка отправки сообщения',
  getBalanceFailed = 'Ошибка при получении данных о балансе',
}