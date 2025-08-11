// Todo: replace this by import of actual BimoRepository type once it exists.
export interface BimoRepository {
    [key: string]: any;
}

export interface SerializedInstanceByIdByType { [key: string]: { [key: string]: Object } }

export interface ParseParams {
  unserializedInstanceByIdByConstructor: Map<Function, Map<string, Object>>;
  serializedInstanceByIdByType: SerializedInstanceByIdByType
  knownClassByClassName: {[key: string]: Function};
  repositoryByClassName: {[key: string]: BimoRepository};
}

export interface SerializedModel {
    serializedRootObject: Object;
    serializedInstanceByIdByType: SerializedInstanceByIdByType
}