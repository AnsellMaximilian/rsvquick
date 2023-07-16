# RSVQUICK - REFINE

## Cover Image
![rsvquick cover image](https://github.com/AnsellMaximilian/rsvquick/assets/56351143/2cb81317-638c-489c-894c-3bc45b69bfba)

## Project Demo Link

[Live app](https://rsvquick.netlify.app/).

## About

### Description

A web application for quickly creating and sending customizable online RSVP invitations with attachable surveys/questions to ask potential attendees.
This application provides simple customizable options so that your RSVP cards can be created quickly while also still be infinitely unique. After creation, cards can be sent out by either sending your potential guests the link to the invitation cards or by using the automatically provided barcode which you can copy as images.

With RSVQuick, you can also ask any arbitrary questions with arbitrary options (answers) to gauge extra information about your attendees. For example, in a wedding, you may want to ask how many of your guests will be vegetarian and prepare the wedding meal menu accordingly. You can attach that exact survey in your RSVP card and assess the results after your guests have responded and determine how much vegetarian food you should order.

### Participants

- [Ansell Maximilian](https://github.com/AnsellMaximilian)

### Preview
- Landing Page
![Landing Page](https://github.com/AnsellMaximilian/rsvquick/assets/56351143/e7de21b2-0869-40bd-95cf-bacf7bc7c21a)

- List Page
![List Page](https://github.com/AnsellMaximilian/rsvquick/assets/56351143/d9630ac7-660c-4a7b-a9b2-e1915427fc07)

- Create Page
![Create Page](https://github.com/AnsellMaximilian/rsvquick/assets/56351143/53f4ae1a-e32d-4b9b-ba02-cd9fbb7fdfc8)

- Show Page
![Show Page](https://github.com/AnsellMaximilian/rsvquick/assets/56351143/02f4be46-d9cd-4537-9b8f-6c065d06b96f)

- Questions Section
![Questions Section](https://github.com/AnsellMaximilian/rsvquick/assets/56351143/f9acb58a-7bd9-446a-92dd-09531744f8ca)

- Guest RSVP Card View
![Guest Card View](https://github.com/AnsellMaximilian/rsvquick/assets/56351143/5611fe48-d40c-410e-b3d2-9977b2dbe188)

## Set Up Project

### Prerequisites

In order to set up your own project, you will need to do the following:

- Create a new Supabase project
- Create the following tables:
![Supbase Schema](https://github.com/AnsellMaximilian/rsvquick/assets/56351143/4af94ffe-0ff3-42d1-948a-e66f7242a1e8)

### Install Project

After you've fulfilled all the prerequisites, install the project:

- Clone the repository:

```
git clone https://github.com/AnsellMaximilian/rsvquick.git rsvquick
```

- Change into directory and install dependencies:

```
cd rsvquick
npm install
```

- Create a `.env` file and add your Supabase project variables:

```
VITE_SUPABASE_KEY=<public key>
VITE_SUPABASE_PROJECT_URL=<project URL>
```

## License

MIT
