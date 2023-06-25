[Live website](https://danosvk.github.io/Library/)

You can add a new card and submit the Title, Author, Genre, # of completed and total pages. It will render a new card that is stored inside a responsive grid container. After that, you can remove them. This is handled dynamically using data-id attribute that automatically re-renders upon deleting one of the cards, and the array where the cards are stored is dynamically re-rendered as well, so data-it always matches the same index of the array. You can also edit the card, which will open the submit-item modal again and you can change any data of that specific card and update on submitting again.

Inputs are validated, submitting incorrect, invalidated or empty data won't work, and there are also error-message that will appear if you try to add or update a book with an already existing Title and also an error message if the number of completed pages is greater than a number of total pages. If the numbers are equal, the automatic message 'Finished' will appear, indicating that the user has finished the book; otherwise 'Reading' message will appear. This value is obviously also saved in the card upon submission. This value is the only one that cannot be directly edited by the user, so the user is not able to mark an incomplete book as finished.

All cards are stored in local storage upon submission and editing and removed from local storage upon deletion.
