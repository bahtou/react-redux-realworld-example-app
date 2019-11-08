import React, { useEffect } from 'react';

import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';
import agent from '../../agent';
import marked from 'marked';
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from '../../constants/actionTypes';
import { useAppState, useAppDispatch  } from '../../context';


function Article({ match }) {
  const appState = useAppState();
  const appDispatch = useAppDispatch();
  const { article, common } = appState;
  const { comments, commentErrors } = article;

  useEffect(() => {
    const main = async () => {
      const payload = await Promise.all([
        agent.Articles.get(match.params.id),
        agent.Comments.forArticle(match.params.id)
      ]);

      appDispatch({ type: ARTICLE_PAGE_LOADED, payload });
    };

    main();
    return () => appDispatch({ type: ARTICLE_PAGE_UNLOADED });
  }, []);


  if (!article.article) {
    return null;
  }

  const markup = { __html: marked(article.article.body, { sanitize: true }) };
  const canModify = common.currentUser && common.currentUser.username === article.article.author.username;
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
              {
                article.article.tagList.map(tag => {
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
            currentUser={common.currentUser} />
        </div>
      </div>
    </div>
  );
}


export default Article;
