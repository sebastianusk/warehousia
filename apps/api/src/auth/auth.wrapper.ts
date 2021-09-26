import DBService from '../db/db.service';

export default class AuthWrapper {
  constructor(public username: string, public warehouse: string[]) {}

  log(db: DBService, action: string, remarks: any) {
    return db.adminlog.create({
      data: {
        username: this.username,
        action,
        remarks,
      },
    });
  }

  static structRemarks(id: string, fields: any) {
    return {
      id,
      remarks: this.scanFields(fields),
    };
  }

  static scanFields(fields: any) {
    return Object.entries(fields)
      .filter((entry) => entry[1] !== undefined)
      .map((entry) => entry[0]);
  }
}
