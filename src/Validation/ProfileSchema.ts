export const ProfileSchema = {
  create: {
    type: 'object',
    required: ['userId', 'birthday'],
    properties: {
      userId: {
        type: 'string',
        pattern: '[0-9a-f]{24}'
      },
      birthday: {
        type: 'string',
        format: 'date'
      }
    }
  }
};
