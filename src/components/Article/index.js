import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import marked from 'marked';

import agent from '../../agent';

import { ARTICLE_PAGE_LOADED } from '../../constants/actionTypes';
import { useArticleState, useArticleDispatch  } from '../../context/article';
import { useCommonState, useCommonDispatch } from '../../context/common';
import { useFetch } from '../../hooks';

import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';


const Article = ({ match }) => {
  const { response, errors, isLoading } = useFetch(
    agent.Articles.get(match.params.id),
    agent.Comments.forArticle(match.params.id)
  );
  const article = useArticleState();
  const articleDispatch = useArticleDispatch();
  const { currentUser } = useCommonState();
  const commonDispatch = useCommonDispatch();

  const { comments, commentErrors } = article;

  useEffect(() => {
    if (!response) return;

    articleDispatch({ type: ARTICLE_PAGE_LOADED, payload: response });
  }, [response]);

  if (!article.article) return null;

  const markup = { __html: marked(article.article.body, { sanitize: true }) };
  const canModify = currentUser && currentUser.username === article.article.author.username;
  return (
    <div className="article-page">

      <div className="banner">
        <div className="container">

          <h1>{article.article.title}</h1>
          <ArticleMeta
            article={article.article}
            canModify={canModify} />

        </div>
      </div>

      <div className="container page">

        <div className="row article-content">
          <div className="col-xs-12">

            <div dangerouslySetInnerHTML={markup}></div>

            <ul className="tag-list">
              {article.article.tagList.map(tag => {
                  return (
                    <li
                      className="tag-default tag-pill tag-outline"
                      key={tag}>
                      {tag}
                    </li>
                  );
                })
              }
            </ul>

          </div>
        </div>

        <hr />

        <div className="article-actions">
        </div>

        <div className="row">
          <CommentContainer
            comments={comments || []}
            errors={commentErrors}
            slug={match.params.id}
            currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};


export default withRouter(Article);
