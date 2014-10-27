/** @jsx React.DOM */

(function () {

Votr.DetailPredmetuUciteliaColumns = [
  ["Meno", 'plne_meno', Votr.sortAs.personName],
  ["Typ", 'typ']
];
Votr.DetailPredmetuUciteliaColumns.defaultOrder = 'a0';

Votr.DetailPredmetuStudentiColumns = Votr.ZoznamPrihlasenychNaTerminColumns.slice();
Votr.DetailPredmetuStudentiColumns.defaultOrder = 'a0';

Votr.DetailPredmetuModal = React.createClass({
  getZapisaniStudenti: function(cache, predmetKey, akademickyRok){
    return cache.get('get_studenti_zapisani_na_predmet', predmetKey, akademickyRok);
  },

  renderUcitelia: function () {
    var cache = new Votr.CacheRequester();
    var {modalAkademickyRok, modalPredmetKey} = this.props.query;

    var data = this.getZapisaniStudenti(cache, modalPredmetKey, modalAkademickyRok);

    if (!data) {
      return <Votr.Loading requests={cache.missing} />;
    }

    var [studenti, predmet] = data;

    var ucitelia = cache.get('get_ucitelia_predmetu', modalPredmetKey, modalAkademickyRok, predmet.semester, predmet.fakulta);

    if (!ucitelia) {
      return <Votr.Loading requests={cache.missing} />;
    }

    var [ucitelia, header] = Votr.sortTable(
      ucitelia, Votr.DetailPredmetuUciteliaColumns, this.props.query, 'modalUciteliaSort');

    return <table className="table table-condensed table-bordered table-striped table-hover">
      <thead>{header}</thead>
      <tbody>
        {ucitelia.map((ucitel, index) =>
          <tr key={index}>
            <td>{ucitel.plne_meno}</td>
            <td>{ucitel.typ}</td>
          </tr>
        )}
      </tbody>
    </table>;
  },

  renderZapisaniStudenti: function () {
    var cache = new Votr.CacheRequester();
    var {modalAkademickyRok, modalPredmetKey} = this.props.query;

    var data = this.getZapisaniStudenti(cache, modalPredmetKey, modalAkademickyRok);

    if (!data) {
      return <Votr.Loading requests={cache.missing} />;
    }

    var [studenti, predmet] = data;

    var [studenti, header] = Votr.sortTable(
      studenti, Votr.DetailPredmetuStudentiColumns, this.props.query, 'modalStudentiSort');

    return <table className="table table-condensed table-bordered table-striped table-hover">
      <thead>{header}</thead>
      <tbody>
        {studenti.map((student, index) =>
          <tr key={index}>
            <td>{student.plne_meno}</td>
            <td>{student.sp_skratka}</td>
            <td>{student.rocnik}</td>
            <td>{student.email}</td>
            <td>{student.datum_prihlasenia}</td>
          </tr>
        )}
      </tbody>
    </table>;
  },

  renderTitle: function() {
    var cache = new Votr.CacheRequester();
    var {modalAkademickyRok, modalPredmetKey} = this.props.query;

    var data = this.getZapisaniStudenti(cache, modalPredmetKey, modalAkademickyRok);

    if (!data) {
      return <Votr.Loading requests={cache.missing} />;
    }

    var [studenti, predmet] = data;

    return predmet.nazov;
  },

  render: function () {
    return <Votr.Modal title={this.renderTitle()}>
      <h2>Učitelia</h2>
      {this.renderUcitelia()}
      <h2>Zapísaní študenti</h2>
      {this.renderZapisaniStudenti()}
    </Votr.Modal>;
  }
});


})();