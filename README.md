# ChatApp

> Made for educational purposes. Do not use as an example of good quality and secure code. May contain ideas and 
> experiments, not tested code and bad-practices. This project is not a finished work of art.

### Project structure.

- `apps/server` - web server part. Where handle authentication, websockets, api
- `apps/server/cmd` - server initializer. Where everything starts
- `apps/server/api` - json api for frontend
- `client` - browser clients
- `config` - all configuration files
- `core` - core part of application. Internal logic part implementations, integrations with
- other infrastructure parts.
- `core/chat` - main chat module. Implements chat parts itself
- `core/integrations` - connect to 3rd party services ( db, ory/kratos etc. )
- `core/proto` - grpc types and service gen
- `docker` - docker-compose files for different environments
- `docs` - documentation