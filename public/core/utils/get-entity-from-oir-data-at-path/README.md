# `@bimo/core-utils-get-entity-from-oir-data-at-path`

## Usage 

See https://bimodata.github.io/docs/getting-started/load-data/from-hastus

## Args

| Name | Type | Description |
| --- | --- | --- | 
| `sourcePath` | `string` | Path to a folder that contains (at least) a control file and a data file |
| `EntityConstructor` | `Entity` | A [Bimo entity](https://github.com/bimodata/bimo/tree/main/public/core/entities) constructor that the data will be loaded into  |
| `options` | `object` | See [options](#options) |

## Options

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `controlFileMatcher` | `RegExp` | `/\.(oir\|controlFile)$/` | A `RegExp` that will be tested against every file in the folder. The first matching file will be used as the control file. |
| `dataFileMatcher` | `RegExp` | `/\.(txt\|csv)$/` | A `RegExp` that will be tested against every file in the folder. Matching file(s) will be used as the data file (s). |
| `multipleEntitiesMode` | `boolean` | `false` | If `false`, only the first matching data file will be loaded, and the return value will be a single entity. If `true`, all matching data files will be loaded, and their content will be returned in an array of entities. |

