const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const title = res.locals.localize('TITLE', req.app.locals.lang);
  const navHome = res.locals.localize('NAV_HOME', req.app.locals.lang);
  const navServices = res.locals.localize('NAV_SERVICES', req.app.locals.lang);
  const navFav = res.locals.localize('NAV_FAV', req.app.locals.lang);
  const navProfile = res.locals.localize('NAV_PROFILE', req.app.locals.lang);
  const navCart = res.locals.localize('NAV_CART', req.app.locals.lang);
  const btnSignIn = res.locals.localize('BTN_SIGN_IN', req.app.locals.lang);
  const btnSignUp = res.locals.localize('BTN_SIGN_UP', req.app.locals.lang);
  const bannerH1 = res.locals.localize('BANNER_H1', req.app.locals.lang);
  const bannerH3 = res.locals.localize('BANNER_H3', req.app.locals.lang);
  const bannerP = res.locals.localize('BANNER_P', req.app.locals.lang);
  const btnLearnMore = res.locals.localize('BTN_LEARN_MORE', req.app.locals.lang);
  const btnAboutUs = res.locals.localize('BTN_ABOUT_US', req.app.locals.lang);

  res.render('index', {
    title,
    navHome,
    navServices,
    navFav,
    navProfile,
    navCart,
    btnSignIn,
    btnSignUp,
    bannerH1,
    bannerH3,
    bannerP,
    btnLearnMore,
    btnAboutUs
  });
});

module.exports = router;
