import React from 'react';
import { connect } from 'react-redux';
import { createNote, deleteNote } from '../../actions/note';
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './EditorComponent.css';
import Alert from '../layout/Alert';
import OrgModal from '../layout/OrgModal/OrgModal';

class EditorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      noteTitle: ''
    };

    // @ts-ignoree
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.note.title && prevProps.note.title !== this.props.note.title) {
      this.setState({
        noteTitle: this.props.note.title
      });
    }
    if (this.props.note.content && prevProps.note.content !== this.props.note.content) {
      const newEditorState = convertFromRaw(JSON.parse(this.props.note.content));

      this.setState({
        editorState: EditorState.createWithContent(newEditorState),
      });
    }
    if (this.props.newNote.new && prevProps.newNote.new !== this.props.newNote.new) {
      this.setState({
        noteTitle: '',
        editorState: EditorState.createEmpty()
      });
    }
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  handleTitleChange = (e) => {
    this.setState({
      noteTitle: e.target.value
    });
  };

  render() {
    const { editorState } = this.state;

    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    // createNote function
    const onSubmit = (e, title, content) => {
      e.preventDefault();
      title = this.state.noteTitle;
      content = JSON.stringify(convertToRaw(contentState));
      this.props.createNote({ title, content });
    };

    // deleteNote function
    const onDelete = noteID => {
      noteID = this.props.note.id;
      this.props.deleteNote(noteID);
      this.setState({
        noteTitle: '',
        editorState: EditorState.createEmpty()
      });
    };

    return (
      <div className="RichEditor-root">
        <div className="title-input">
          <input
            type='text'
            placeholder="Title"
            onChange={e => this.handleTitleChange(e)}
            value={this.state.noteTitle}
          />
        </div>
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className='buttons'>
          <form onSubmit={e => onSubmit(e)}>
            <button>Save</button>
          </form>
          <button onClick={() => onDelete()}>Delete</button>
          <OrgModal />
        </div>
        <div className={className} onClick={this.focus}>
          <Alert />
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            placeholder="Tell a story..."
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  note: state.note,
  notebook: state.notebook,
  newNote: state.newNote
});

export default connect(mapStateToProps, { createNote, deleteNote })(EditorComponent);
