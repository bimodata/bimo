# `@bimo/core-services-get-entity-from-oir-data-string-and-control-file`

## Usage 

See https://bimodata.github.io/docs/getting-started/load-data/from-hastus

## Args

| Name | Type | Description |
| --- | --- | --- | 
| `arg1` | `object` | See [arg1](#arg1) |
| `config` | `object` | See [config](#config) |
| `context` | `BimoContext` | See [context](#context) |

### arg1

The first argument passed to the service is an object with the 3 following mandatory keys:

| Key | Type | Description |
| --- | --- | --- | 
| `oirDataString` | `string` | A string that contains the content of a csv data file. The format of the data has to match the format described in the `oirControlFileString`. |
| `oirControlFileString` | `string` | A string that contains the content of a control file. |
| `EntityConstructor` | `Entity` | A [Bimo entity](https://github.com/bimodata/bimo/tree/main/public/core/entities) constructor that the data will be loaded into.  |


### Config

The second argument passed to the service is a config object. It will be passed directly to [`@bimo/core-utils-control-file-and-csv-data-parser`](https://github.com/bimodata/bimo/tree/main/public/core/utils/control-file-and-csv-data-parser), but we set default values here. 

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `convertItemNamesToCamel` | `Boolean` | `true` | If true, object names found in the control file will be converted to camelCase |
| `convertKeysToCamel` | `Boolean` | `true` | If true, keys/attribute names found in the control file will be converted to camelCase |

### Context

The third argument passed to the service is a BimoContext object, that may contain global context values or utilities, such as a logging framework. 