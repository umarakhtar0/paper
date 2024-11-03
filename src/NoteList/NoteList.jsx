

// import React, { useState } from 'react';
// import { useNotes } from './NoteContext';
// import { Link } from 'react-router-dom';
// import './App.scss'; // Import the SCSS file for styling

// const NoteList = () => {
//     const { notes, deleteNote, updateNote } = useNotes();
//     const [editingNoteId, setEditingNoteId] = useState(null);
//     const [editedTitle, setEditedTitle] = useState('');
//     const [editedFiles, setEditedFiles] = useState({});
//     const [searchTerm, setSearchTerm] = useState('');
//     const [comments, setComments] = useState({});
//     const TITLE_LIMIT = 50;
//     const FILE_NAME_LIMIT = 30;

//     const categorizedNotes = notes.reduce((acc, note) => {
//         const category = note.category || 'Uncategorized';
//         if (!acc[category]) {
//             acc[category] = [];
//         }
//         acc[category].push(note);
//         return acc;
//     }, {});

//     const handleEditClick = (note) => {
//         setEditingNoteId(note.id);
//         setEditedTitle(note.title);
//         const filesObj = note.files.reduce((obj, file, index) => {
//             obj[index] = file.name;
//             return obj;
//         }, {});
//         setEditedFiles(filesObj);
//     };

//     const handleUpdateNote = (noteId) => {
//         const currentNote = notes.find(note => note.id === noteId);
//         const updatedNote = {
//             ...currentNote,
//             title: editedTitle,
//             files: currentNote.files.map((file, index) => ({
//                 ...file,
//                 name: editedFiles[index] || file.name
//             }))
//         };

//         updateNote(updatedNote);
//         setEditingNoteId(null);
//         setEditedTitle('');
//         setEditedFiles({});
//     };

//     const handleCommentChange = (noteId, event) => {
//         const newComment = event.target.value;
//         setComments(prevComments => ({
//             ...prevComments,
//             [noteId]: newComment
//         }));
//     };

//     const addComment = (noteId) => {
//         if (!comments[noteId]) return;
//         const noteComments = notes.find(note => note.id === noteId).comments || [];
//         const updatedComments = [...noteComments, comments[noteId]];
//         const updatedNote = { ...notes.find(note => note.id === noteId), comments: updatedComments };
//         updateNote(updatedNote);
//         setComments(prevComments => ({ ...prevComments, [noteId]: '' }));
//     };

//     const filteredNotes = notes.filter(note =>
//         note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         note.content.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const renderNotes = () => {
//         return Object.keys(categorizedNotes).map(category => (
//             <div key={category} className="category">
//                 <h3>{category}</h3>
//                 <ul className="note-list">
//                     {categorizedNotes[category].map(note => (
//                         <li key={note.id} className="note-item">
//                             {editingNoteId === note.id ? (
//                                 <div className="edit-title">
//                                     <input
//                                         type="text"
//                                         value={editedTitle}
//                                         maxLength={TITLE_LIMIT}
//                                         onChange={(e) => setEditedTitle(e.target.value)}
//                                         placeholder={`Title (max ${TITLE_LIMIT} chars)`}
//                                         className="note-input"
//                                     />
//                                     <span className="text-gray-500">{editedTitle.length}/{TITLE_LIMIT}</span>
//                                     <button onClick={() => handleUpdateNote(note.id)} className="save-button">
//                                         Save
//                                     </button>
//                                 </div>
//                             ) : (
//                                 <div className="note-title">
//                                     <h4>{note.title}</h4>
//                                     <button onClick={() => handleEditClick(note)} className="edit-button">
//                                         Edit Title
//                                     </button>
//                                 </div>
//                             )}
//                             <p>{note.content}</p>
//                             <p><strong>Uploaded Files:</strong></p>
//                             <ul className="files-list">
//                                 {note.files.map((file, index) => (
//                                     <li key={index} className="file-item">
//                                         {editingNoteId === note.id ? (
//                                             <div>
//                                                 <input
//                                                     type="text"
//                                                     value={editedFiles[index] || file.name}
//                                                     maxLength={FILE_NAME_LIMIT}
//                                                     onChange={(e) => setEditedFiles({...editedFiles, [index]: e.target.value})}
//                                                     placeholder={`File name (max ${FILE_NAME_LIMIT} chars)`}
//                                                     className="file-input"
//                                                 />
//                                                 <span className="text-gray-500">{(editedFiles[index] || file.name).length}/{FILE_NAME_LIMIT}</span>
//                                             </div>
//                                         ) : (
//                                             <a
//                                                 href={file.url}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="file-link"
//                                             >
//                                                 {file.name}
//                                             </a>
//                                         )}
//                                         <Link to={`/edit/${note.id}/${index}`} className="edit-link">
//                                             Edit
//                                         </Link>
//                                     </li>
//                                 ))}
//                             </ul>

//                             <div className="comments-section">
//                                 <input
//                                     type="text"
//                                     value={comments[note.id] || ''}
//                                     onChange={(e) => handleCommentChange(note.id, e)}
//                                     placeholder="Add a comment..."
//                                     className="comment-input"
//                                 />
//                                 <button onClick={() => addComment(note.id)} className="submit-comment">
//                                     Submit
//                                 </button>
//                             </div>
//                             {note.comments && note.comments.length > 0 && (
//                                 <div className="comments-list">
//                                     <h5>Comments:</h5>
//                                     <ul>
//                                         {note.comments.map((comment, index) => (
//                                             <li key={index}>{comment}</li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             )}
//                             <button onClick={() => deleteNote(note.id)} className="delete-button">
//                                 Delete
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         ));
//     };

//     return (
//         <div className="note-list-container">
//             <h2>Notes</h2>
//             <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search notes..."
//                 className="search-input"
//             />
//             {renderNotes().length === 0 ? (
//                 <p>No notes available.</p>
//             ) : (
//                 renderNotes()
//             )}
//         </div>
//     );
// };

// export default NoteList;




import React, { useState } from 'react';
import { useNotes } from './NoteContext';
import { Link } from 'react-router-dom';
import './App.scss'; // Import the SCSS file for styling

const NoteList = () => {
    const { notes, deleteNote, updateNote } = useNotes();
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedFiles, setEditedFiles] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [comments, setComments] = useState({});
    const TITLE_LIMIT = 50;
    const FILE_NAME_LIMIT = 30;

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const categorizedNotes = filteredNotes.reduce((acc, note) => {
        const category = note.category || 'Uncategorized';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(note);
        return acc;
    }, {});

    const handleEditClick = (note) => {
        setEditingNoteId(note.id);
        setEditedTitle(note.title);
        const filesObj = note.files.reduce((obj, file, index) => {
            obj[index] = file.name;
            return obj;
        }, {});
        setEditedFiles(filesObj);
    };

    const handleUpdateNote = (noteId) => {
        const currentNote = notes.find(note => note.id === noteId);
        const updatedNote = {
            ...currentNote,
            title: editedTitle,
            files: currentNote.files.map((file, index) => ({
                ...file,
                name: editedFiles[index] || file.name
            }))
        };

        updateNote(updatedNote);
        setEditingNoteId(null);
        setEditedTitle('');
        setEditedFiles({});
    };

    const handleCommentChange = (noteId, event) => {
        const newComment = event.target.value;
        setComments(prevComments => ({
            ...prevComments,
            [noteId]: newComment
        }));
    };

    const addComment = (noteId) => {
        if (!comments[noteId]) return;
        const noteComments = notes.find(note => note.id === noteId).comments || [];
        const updatedComments = [...noteComments, comments[noteId]];
        const updatedNote = { ...notes.find(note => note.id === noteId), comments: updatedComments };
        updateNote(updatedNote);
        setComments(prevComments => ({ ...prevComments, [noteId]: '' }));
    };

    const renderNotes = () => {
        return Object.keys(categorizedNotes).map(category => (
            <div key={category} className="category">
                <h3>{category}</h3>
                <ul className="note-list">
                    {categorizedNotes[category].map(note => (
                        <li key={note.id} className="note-item">
                            {editingNoteId === note.id ? (
                                <div className="edit-title">
                                    <input
                                        type="text"
                                        value={editedTitle}
                                        maxLength={TITLE_LIMIT}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                        placeholder={`Title (max ${TITLE_LIMIT} chars)`}
                                        className="note-input"
                                    />
                                    <span className="text-gray-500">{editedTitle.length}/{TITLE_LIMIT}</span>
                                    <button onClick={() => handleUpdateNote(note.id)} className="save-button">
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div className="note-title">
                                    <h4>{note.title}</h4>
                                    <button onClick={() => handleEditClick(note)} className="edit-button">
                                        Edit Title
                                    </button>
                                </div>
                            )}
                            <p>{note.content}</p>
                            <p><strong>Uploaded Files:</strong></p>
                            <ul className="files-list">
                                {note.files.map((file, index) => (
                                    <li key={index} className="file-item">
                                        {editingNoteId === note.id ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    value={editedFiles[index] || file.name}
                                                    maxLength={FILE_NAME_LIMIT}
                                                    onChange={(e) => setEditedFiles({...editedFiles, [index]: e.target.value})}
                                                    placeholder={`File name (max ${FILE_NAME_LIMIT} chars)`}
                                                    className="file-input"
                                                />
                                                <span className="text-gray-500">{(editedFiles[index] || file.name).length}/{FILE_NAME_LIMIT}</span>
                                            </div>
                                        ) : (
                                            <a
                                                href={file.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="file-link"
                                            >
                                                {file.name}
                                            </a>
                                        )}
                                        <Link to={`/edit/${note.id}/${index}`} className="edit-link">
                                            Edit
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="comments-section">
                                <input
                                    type="text"
                                    value={comments[note.id] || ''}
                                    onChange={(e) => handleCommentChange(note.id, e)}
                                    placeholder="Add a comment..."
                                    className="comment-input"
                                />
                                <button onClick={() => addComment(note.id)} className="submit-comment">
                                    Submit
                                </button>
                            </div>
                            {note.comments && note.comments.length > 0 && (
                                <div className="comments-list">
                                    <h5>Comments:</h5>
                                    <ul>
                                        {note.comments.map((comment, index) => (
                                            <li key={index}>{comment}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <button onClick={() => deleteNote(note.id)} className="delete-button">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        ));
    };

    return (
        <div className="note-list-container">
            <h2>Notes</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search notes..."
                className="search-input"
            />
            {renderNotes().length === 0 ? (
                <p>No notes available.</p>
            ) : (
                renderNotes()
            )}
        </div>
    );
};

export default NoteList;
