# QUICK NOTE 

A browser extension for quick note-taking while browsing the web.

![icon128](https://github.com/Myst1cX/quick-note-extension/assets/97919309/ee233a18-fd2c-4fd5-bebb-69ecbf020425)

Please note that this extension is currently being tested and developed solely on the Edge browser. 
While it should natively work with other Chromium-based browsers, support for other browsers is postponed to the indefinite future. 

## Features

Note Creation and Editing: The extension allows users to create and edit   notes. Users can enter a title, content, and tags for each note.

Note Saving: Users can save their notes by clicking the "Save Note"   button. The notes are stored locally using Chrome's storage API.

Note Display: Saved notes are displayed in a list format. Each note is shown with its title, content (hidden by default), and tags. Clicking on a note expands or collapses its content.

Note Sorting: The extension sorts the notes based on their timestamp in descending order. The most recently created or edited notes appear at the top.

Note Deletion: Users can delete a note by clicking the "Delete" button next to the respective note. The note is removed from the storage and the list of displayed notes is updated.

Note Searching: The extension provides a search input field where users can enter a search query. The notes are filtered based on the query, matching against the note title, content, or tags.

Window Width Preservation: The extension remembers the width of the extension window using Chrome's storage API. This allows the window to retain its width across browser sessions.

NOTE: 
The provided code focuses on the functionality of the extension, and additional features such as syncing across devices, data backup, or sharing options are not included.

## Screenshots

(Coming Soon)

## Installation

1. Clone the repository or download the source code.
2. Open Google Chrome or any Chromium-based browser.
3. Go to `chrome://extensions`.
4. Enable the "Developer mode" toggle switch.
5. Click on "Load unpacked" button and select the folder containing the extension source code.
6. The extension should now be installed and ready to use.

## Usage

1. Launch the extension by clicking on its icon in the browser toolbar.
2. Enter the note details (title, content, tags) in the provided fields.
3. Click the "Save Note" button to save the note.
4. Click the "Clear Note" button to clear the current note.
5. To edit a note, click the "Edit" button next to the note.
6. To delete a note, click the "Delete" button next to the note.
7. Use the search input field to filter notes based on title, content, or tags.

## Roadmap

1. Enhanced Note Editing:
Implement functionality to overwrite the original note with new information when editing a note. This ensures that the changes made to a note are saved within the existing note rather than creating a new note each time.
Update the editing feature to provide a seamless and efficient user experience when modifying note content.
Introduce a dedicated note text editor with essential formatting options such as bold, italics, bullet points, and numbered lists.
Enable users to customize the appearance of their notes by incorporating basic text styling capabilities.

2. Persistent Input Fields:
Enhance the extension's behavior by preserving the entered text in note title, note content, note tags, and the search notes tab when the user clicks outside the extension window.
Ensure that the entered text is retained even if the user switches focus to another application or performs other tasks, allowing for a more convenient and uninterrupted note-taking experience.

3. Improved Note Formatting:
Implement a feature to display line breaks (full line spaces) between sentences in the note content.
Enable proper rendering of line breaks to enhance readability and maintain the original formatting of the saved note.

4. Dark Mode Toggle:
Introduce a dark mode toggle option, including the ability to select system default or AMOLED mode.
Enhance the visual experience of the extension by providing users with a choice of different themes to suit their preferences and reduce eye strain.

5. Pinning Notes:
Implement the ability for users to pin specific notes for quick access and easy organization.
Enable users to mark important or frequently used notes as pinned, ensuring they are prominently displayed for convenient reference.

6. Trash Can and Note Restoration:
Introduce a trash can feature where deleted notes can be stored temporarily.
Provide users with the ability to restore deleted notes from the trash can, minimizing the risk of accidental data loss.

7. Credits Menu:
Include a dedicated menu section to acknowledge and credit the developer of the extension and possible future contributors.

## Development

To further develop and customize the extension:

1. Fork the repository and clone it to your local machine.
2. Make changes to the source code using your preferred code editor.
3. Test the changes by loading the unpacked extension in your browser (follow the installation instructions above).
4. If everything looks good, commit your changes and push them to your forked repository.
5. Create a pull request to the original repository.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License] - see the [LICENSE](LICENSE) file for details.

