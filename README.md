# WEBSITE : OpenPOWER Foundation #

This repository is the source that builds the static front public website of the OpenPOWER Foundation.

- https://openpowerfoundation.org/

## Static Site ##

This repository is the source used by [HugoCMS](https://gohugo.io/) to build the OpenPOWER public facing website.  

## Testing the forms ##

The forms post to [formsender](https://github.com/osuosl/formsender), which creates tickets in the OpenPOWER Foundation RT.
To see the ticket a form creates without sending one to RT, run a local formsender in DRY_RUN mode with Docker and serve the site in another terminal:

```bash
make formsender
make serve
```

Submit a form at http://localhost:1314/ and formsender writes the ticket it would have created (queue, subject, custom fields and body) to its log.
The development config points the forms at it and uses Cloudflare's always-passing Turnstile test key.
To test unreleased formsender changes, set `FORMSENDER_SRC` to a formsender checkout and it is built from there:

```bash
FORMSENDER_SRC=../formsender make formsender
```

## License ##

This repository has multiple open source licenses, all permissive.  
Any logos, images, trademarks, specifications are property of their respective owners.  
The OpenPOWER Foundation has registered trademarks and uses trademarks.
For a list of trademarks of the OpenPOWER Foundation, please see our Trademark and Logo Usage Guidelines.  

- assets : [Creative Commons CC-BY-4.0](assets/LICENSE) License
- config : [Apache Version 2.0](config/LICENSE) License
- content : [Creative Commons CC-BY-4.0](content/LICENSE) License
- data : [Creative Commons CC-BY-4.0](content/LICENSE) License
- static : [Creative Commons CC-BY-4.0](static/LICENSE) License
- themes : [Apache Version 2.0](theme/LICENSE) License
