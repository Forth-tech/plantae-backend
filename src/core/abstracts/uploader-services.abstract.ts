export abstract class IUploaderService {
  abstract fileUpload(ID_User: string, file: Express.Multer.File);
}
