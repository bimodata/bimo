# `@bimo/osrd-services-create-train-schedule-from-item`

Generic configurable service that creates a RAILJSON/OSRD train schedule from an item.

This service's main value is to return objects that follow OSRD's train schedule schema and to offer great flexibility in the way to populate the values in this schema by relying on `@bimo/core-utils-create-props-from-items`. 

Ideally, you should wrap this service inside another more specific service in which you will hardcode some of the config for `@bimo/core-utils-create-props-from-items` based on your data source.