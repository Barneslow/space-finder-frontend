import { S3, config } from "aws-sdk";
import { ICreateSpaceState } from "../components/spaces/CreateSpace";
import { Space } from "../models/model";
import { generateRandomId } from "../utils/Utils";
import { config as appConfig } from "./config";

config.update({
  region: appConfig.REGION,
});

export class DataService {
  public async createSpace(iCreateSpace: ICreateSpaceState) {
    if (iCreateSpace.photo) {
      const photoUrl = await this.uploadPublicFile(
        iCreateSpace.photo,
        appConfig.SPACES_PHOTOS_BUCKET
      );
      iCreateSpace.photoURL = photoUrl;
      iCreateSpace.photo = undefined;
    }
    const requestUrl = appConfig.api.spacesUrl;
    const requestOptions: RequestInit = {
      method: "POST",
      body: JSON.stringify(iCreateSpace),
    };
    const result = await fetch(requestUrl, requestOptions);
    const resultJSON = await result.json();
    return JSON.stringify(resultJSON.id);
  }

  private async uploadPublicFile(file: File, bucket: string) {
    const fileName = generateRandomId() + file.name;
    const uploadResult = await new S3({ region: appConfig.REGION })
      .upload({
        Bucket: bucket,
        Key: fileName,
        Body: file,
        ACL: "public-read",
      })
      .promise();

    return uploadResult.Location;
  }

  public async getSpaces(): Promise<Space[]> {
    const requestUrl = appConfig.api.spacesUrl;
    const requestResult = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
    });

    const responseJSON = await requestResult.json();

    return responseJSON;
  }

  public async reserveSpace(spaceId: string): Promise<string | undefined> {
    if (spaceId === "123") {
      return "5555";
    } else {
      return undefined;
    }
  }
}
