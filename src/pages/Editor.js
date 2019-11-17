import React, { useEffect }  from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { withRouter } from 'react-router';

import agent from '../agent';

import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  REMOVE_TAG,
  ARTICLE_SUBMITTED,
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';
import { useCommonDispatch  } from '../context/common';
import { useEditorState, useEditorDispatch } from '../context/editor';
import ListErrors from '../components/ListErrors';
import { EditorLayoutComponent } from './_layouts';


const Editor = ({ errors }) => {
  const history = useHistory();
  const { slug } = useParams();
  const commonDispatch = useCommonDispatch();

  const editor = useEditorState();
  const editorDispatch = useEditorDispatch()
  const { articleSlug, title, description, body, tagList, tagInput, inProgress } = editor;

  const updateFieldEvent = key => ev => editorDispatch({ type: UPDATE_FIELD_EDITOR, key, value: ev.target.value });
  const changeTitle = updateFieldEvent('title');
  const changeDescription = updateFieldEvent('description');
  const changeBody = updateFieldEvent('body');
  const changeTagInput = updateFieldEvent('tagInput');

  const watchForEnter = ev => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      editorDispatch({ type: ADD_TAG });
    }
  };

  const removeTagHandler = tag => () => {
    editorDispatch({ type: REMOVE_TAG, tag });
  };

  const submitForm = async ev => {
    ev.preventDefault();
    const article = { title, description, body, tagList };
    const slug = { slug: articleSlug };
    const payload = articleSlug ?
      await agent.Articles.update(Object.assign(article, slug)) :
      await agent.Articles.create(article);

    editorDispatch({ type: ARTICLE_SUBMITTED, payload });
    commonDispatch({ type: ARTICLE_SUBMITTED, payload });
    history.push(`/article/${payload.article.slug}`);
  };

  useEffect(() => {
    async function getArticles(slug) {
      const payload = await agent.Articles.get(slug)
      editorDispatch({ type: EDITOR_PAGE_LOADED, payload });
    };

    if (slug) {
      getArticles(slug);
    } else {
      editorDispatch({ type: EDITOR_PAGE_LOADED, payload: null });
    }
  }, [slug]);

  return (
    <div className="editor-page">
      <EditorLayoutComponent>

        <ListErrors errors={errors} />

        <form>
          <fieldset>

            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Article Title"
                value={title}
                onChange={changeTitle} />
            </fieldset>

            <fieldset className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="What's this article about?"
                value={description}
                onChange={changeDescription} />
            </fieldset>

            <fieldset className="form-group">
              <textarea
                className="form-control"
                rows="8"
                placeholder="Write your article (in markdown)"
                value={body}
                onChange={changeBody}>
              </textarea>
            </fieldset>

            <fieldset className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Enter tags"
                value={tagInput}
                onChange={changeTagInput}
                onKeyUp={watchForEnter} />

              <div className="tag-list">
                {(tagList || []).map(tag => {
                    return (
                      <span className="tag-default tag-pill" key={tag}>
                        <i  className="ion-close-round"
                            onClick={removeTagHandler(tag)}>
                        </i>
                        {tag}
                      </span>
                    );
                  })
                }
              </div>
            </fieldset>

            <button
              className="btn btn-lg pull-xs-right btn-primary"
              type="button"
              disabled={inProgress}
              onClick={submitForm}>
              Publish Article
            </button>

          </fieldset>
        </form>

      </EditorLayoutComponent>
    </div>
  );
};


export default withRouter(Editor);
