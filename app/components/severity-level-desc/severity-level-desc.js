var React = require('react'),
    i18n = require('../../lib/i18n'),
    { PropTypes } = React;

var SeverityLevelDesc = React.createClass({
    propTypes: {
        severity: PropTypes.string,
        count: PropTypes.number
    },

    render: function() {
        var { count, severity } = this.props,
            translation = {
                hi: i18n
                    .translate('You have serious exploit on your site. You must fix it as soon as you can. Hackers can damage your site.')
                    .ifPlural(count, 'You have %d hi level exploits on your site. You must fix this issues as soon as you can. Hackers can damage your site.'),
                medium: i18n
                    .translate('We found warning on your site. This warning show that your site have problems.')
                    .ifPlural(count, 'We found %s medium warnings on your site. This warnings show that your site have problems.'),
                low: i18n
                    .translate('Some info you need to know.')
                    .ifPlural(count, 'There are %s notices you need to know.')
            }[severity],
            desc;

        desc = translation ? translation.fetch(count) : '';

        return (
            <p className="c-severity-level-desc">
                {desc}
            </p>
        );
    }
});

module.exports = SeverityLevelDesc;
