
export const getFaqSectionHeroImage = (state) =>  state.faq?.heroImage || '';
export const getFaqSectionTitle = (state) =>  state.faq?.title || '';
export const getFaqSectionSubTitle = (state) =>  state.faq?.subtitle || '';
export const getArticles = (state) =>  state.faq?.articles || [];
export const getArticle = (state, id) => {
    const articles = state.faq?.articles || [];
    return articles.find(article => article.id === id) || {};
}
export default {};
