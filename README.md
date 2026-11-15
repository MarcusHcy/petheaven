# Pet Heaven

Web application for the Pet Heaven charity, built with React for ISIT207 Assignment 3.
Visitors can learn about the society, browse pets, join as a member, ask to adopt a pet,
or ask to release a pet.

## Run it on your computer
You need Node.js installed (nodejs.org, the LTS version).

    npm install
    npm run dev

## How the forms work
There is no backend. When a form is sent it is saved in the browser (see the Staff inbox page)
and the visitor's email app opens with the form filled in for the administrator.

## Folder guide
    src/pages        one file per page
    src/components   reusable pieces (PetCard, FormField, ImageSlot, HeroCarousel ...)
    src/hooks        useForm, useLocalStorage, useFavourites
    src/utils        validators and form saving/emailing
    src/data/pets.js the list of pets
    src/config.js    society name, email, address
