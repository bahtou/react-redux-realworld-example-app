import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import marked from 'marked';

import agent from '../agent';

import { ARTICLE_PAGE_LOADED } from '../constants/actionTypes';
import { useArticleState, useArticleDispatch  } from '../context/article';
import { useCommonState } from '../context/common';
import { useFetch } from '../hooks';

import Banner from '../components/Banner';
import CommentContainer from '../components/comments';


const Article = () => {
  const { id } = useParams();
  const { response, errors, isLoading } = useFetch(
    agent.Articles.get(id),
    agent.Comments.forArticle(id)
  );
  const article = useArticleState();
  const articleDispatch = useArticleDispatch();
  const { currentUser } = useCommonState();

  const { comments, commentErrors } = article;

  useEffect(() => {
    if (!response) return;

    articleDispatch({ type: ARTICLE_PAGE_LOADED, payload: response });
  }, [response]);

  if (!article.article) return null;

  const markup = { __html: marked(article.article.body, { sanitize: true }) };
  return (
    <div className="article-page">

      <Banner article={article.article} />

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

        <div className="article-actions"></div>

        <div className="row">
          <CommentContainer
            comments={comments || []}
            errors={commentErrors}
            slug={id}
            currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};


export default Article;
