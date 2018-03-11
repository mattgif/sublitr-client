import React from 'react';
import PageHeader from "./pageheader";

export default function SubmissionForm(props) {
    return (
        <main>
            <PageHeader/>
            <form>
                <fieldset>
                    <legend>Submission Info</legend>
                    <label for="title">Submission title</label>
                    <input type="text" id="title" name="title" required/>
                    <label for="publication">Submit to which publication?</label>
                    <select name="publication" id="publication" required>
                        <option disabled>Choose a publication</option>
                        <option value="pub1">Publication 1</option>
                        <option value="pub2">Publication 2</option>
                        <option value="pub3">Publication 3</option>
                        <option value="pub4">Publication 4</option>
                        <option value="pub5">Publication 5</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend>Cover letter</legend>
                    <textarea name="coverletter" id="coverletter" placeholder="Write a short cover letter to the editors of the publication." required></textarea>
                </fieldset>
                <fieldset>
                    <legend>Upload document(s)</legend>
                    <p class="tip">Documents must be in .pdf, .doc, or .docx formats.</p>
                    <input type="file" name="upload1" id="upload1" required />
                </fieldset>
                <button type="submit">Submit?</button>
            </form>
        </main>
    )
}