const mapper = require("automapper-js");
const jwt = require('jsonwebtoken');
const {
  RegistroDto,
  Registro2Dto,
  TemperaturaDto,
  DireccionVientoDto,
  TermometroSecoDto,
  TermometroHumedoDto,
  PresionAtmosfericaDto,
  NubosidadDto,
  VisibilidadDto,
  GeotermometroDto,
  RegistroJournalDto,
  TemperaturaJournalDto,
  DireccionVientoJournalDto,
  TermometroSecoJournalDto,
  TermometroHumedoJournalDto,
  PresionAtmosfericaJournalDto,
  NubosidadJournalDto,
  VisibilidadJournalDto,
  GeotermometroJournalDto,
} = require("../dtos");

class RegistroController {
  constructor({
    RegistroService,
    TemperaturaService,
    DireccionVientoService,
    TermometroSecoService,
    TermometroHumedoService,
    PresionAtmosfericaService,
    NubosidadService,
    VisibilidadService,
    GeotermometroService,
    RegistroJournalService,
    TemperaturaJournalService,
    DireccionVientoJournalService,
    TermometroSecoJournalService,
    TermometroHumedoJournalService,
    PresionAtmosfericaJournalService,
    NubosidadJournalService,
    VisibilidadJournalService,
    GeotermometroJournalService,
  }) {
    this._registroService = RegistroService;
    this._temperaturaService = TemperaturaService;
    this._direccionVientoService = DireccionVientoService;
    this._termometroSecoService = TermometroSecoService;
    this._termometroHumedoService = TermometroHumedoService;
    this._presionAtmosfericaService = PresionAtmosfericaService;
    this._nubosidadService = NubosidadService;
    this._visibilidadService = VisibilidadService;
    this._geotermometroService = GeotermometroService;
    this._registroJournalService = RegistroJournalService;
    this._temperaturaJournalService = TemperaturaJournalService;
    this._direccionVientoJournalService = DireccionVientoJournalService;
    this._termometroSecoJournalService = TermometroSecoJournalService;
    this._termometroHumedoJournalService = TermometroHumedoJournalService;
    this._presionAtmosfericaJournalService = PresionAtmosfericaJournalService;
    this._nubosidadJournalService = NubosidadJournalService;
    this._visibilidadJournalService = VisibilidadJournalService;
    this._geotermometroJournalService = GeotermometroJournalService;
  }

  async getRegistros(req, res) {
    let registros = await this._registroService.getAll();
    registros = registros.map(registro => mapper(RegistroDto, registro));
    return res.send({
      payload: registros
    });
  }

  async getRegistro(req, res) {
    const {
      id
    } = req.params;
    let registro = await this._registroService.get(id);
    let temperatura = await this._temperaturaService.get(registro.TemperaturaId);
    let direccionViento = await this._direccionVientoService.get(registro.DireccionVientoId);
    let termometroSeco = await this._termometroSecoService.get(registro.TermometroSecoId);
    let termometroHumedo = await this._termometroHumedoService.get(registro.TermometroHumedoId);
    let presionAtmosferica = await this._presionAtmosfericaService.get(registro.PresionAtmosfericaId);
    let nubosidad = await this._nubosidadService.get(registro.NubosidadId);
    let visibilidad = await this._visibilidadService.get(registro.VisibilidadId);
    let geotermometro = await this._geotermometroService.get(registro.GeotermometroId);

    var r2 = new Registro2Dto();
    r2.id = registro.id;
    r2.fecha = registro.fecha;
    r2.agua_caida = registro.agua_caida;
    r2.horas_sol = registro.horas_sol;
    r2.evaporamiento = registro.evaporamiento;
    r2.createdAt = registro.createdAt;
    r2.updatedAt = registro.updatedAt;
    r2.Temperatura = temperatura;
    r2.DireccionViento = direccionViento;
    r2.TermometroSeco = termometroSeco;
    r2.TermometroHumedo = termometroHumedo;
    r2.PresionAtmosferica = presionAtmosferica;
    r2.Nubosidad = nubosidad;
    r2.Visibilidad = visibilidad;
    r2.Geotermometro = geotermometro;

    if (!r2) {
      return res.status(404).send();
    }
    return res.send({
      payload: r2
    });
  }
  async getRegistroFecha(req, res) {
    const {
      fecha
    } = req.params;
    var r2 = new Registro2Dto();
    let registroF = null;
    var dateReq = new Date(fecha);
    dateReq.setHours(0,0,0,0);
    dateReq.setUTCHours(0,0,0,0);
    // var fechaPicker = new Date(fecha)
    // var fechaString = String(fechaPicker.getFullYear()) + "-";
    // if (fechaPicker.getMonth() + 1 < 10) {
    //   fechaString += "0" + String(fechaPicker.getMonth() + 1) + "-";
    // } else {
    //   fechaString += String(fechaPicker.getMonth() + 1) + "-";
    // }
    // if (fechaPicker.getDate() < 10) {
    //   fechaString += "0" + String(fechaPicker.getDate()) + "T";
    // } else {
    //   fechaString += String(fechaPicker.getDate()) + "T";
    // }
    // fechaString += "00:00:00Z";
    // var fechaBusqueda = new Date(fechaString);


    // var fechaString = `${dateReq.getFullYear()}`;
    // fechaString += "-"+`${dateReq.getMonth()}`;
    registroF = await this._registroService.getbyFecha(dateReq);
    if (registroF != null) {

      let temperaturaF = await this._temperaturaService.get(registroF.TemperaturaId);
      let direccionVientoF = await this._direccionVientoService.get(registroF.DireccionVientoId);
      let termometroSecoF = await this._termometroSecoService.get(registroF.TermometroSecoId);
      let termometroHumedoF = await this._termometroHumedoService.get(registroF.TermometroHumedoId);
      let presionAtmosfericaF = await this._presionAtmosfericaService.get(registroF.PresionAtmosfericaId);
      let nubosidadF = await this._nubosidadService.get(registroF.NubosidadId);
      let visibilidadF = await this._visibilidadService.get(registroF.VisibilidadId);
      let geotermometroF = await this._geotermometroService.get(registroF.GeotermometroId);

      r2.id = registroF.id;
      r2.fecha = registroF.fecha;
      r2.agua_caida = registroF.agua_caida;
      r2.horas_sol = registroF.horas_sol;
      r2.evaporamiento = registroF.evaporamiento;
      r2.createdAt = registroF.createdAt;
      r2.updatedAt = registroF.updatedAt;
      r2.Temperatura = temperaturaF;
      r2.DireccionViento = direccionVientoF;
      r2.TermometroSeco = termometroSecoF;
      r2.TermometroHumedo = termometroHumedoF;
      r2.PresionAtmosferica = presionAtmosfericaF;
      r2.Nubosidad = nubosidadF;
      r2.Visibilidad = visibilidadF;
      r2.Geotermometro = geotermometroF;

    }



    if (r2.id == 0) {

      var registro = new RegistroDto();
      var temperatura = new TemperaturaDto();
      var termometroHumedo = new TermometroHumedoDto();
      var termometroSeco = new TermometroSecoDto();
      var presionAtmosferica = new PresionAtmosfericaDto();
      var direccionViento = new DireccionVientoDto();
      var nubosidad = new NubosidadDto();
      var visibilidad = new VisibilidadDto();
      var geotermometro = new GeotermometroDto();
      var temperaturaJournal = new TemperaturaJournalDto();
      var direccionVientoJournal = new DireccionVientoJournalDto();
      var geotermometroJournal = new GeotermometroJournalDto();
      var nubosidadJournal = new NubosidadJournalDto();
      var presionAtmosfericaJournal = new PresionAtmosfericaJournalDto();
      var termometroHumedoJournal = new TermometroHumedoJournalDto();
      var termometroSecoJournal = new TermometroSecoJournalDto();
      var visibilidadJournal = new VisibilidadJournalDto();
      var registroJournal = new RegistroJournalDto();

      let token = req.headers.authorization.split(' ')[1];
      let payload = jwt.verify(token, 'secretKey');
      const idUser = payload.subject;
      const IPUser = req.header('x-forwarded-for') || req.connection.remoteAddress;

      const createdTemperatura = await this._temperaturaService.create(temperatura);
      temperaturaJournal.IPUser = IPUser;
      temperaturaJournal.UsuarioId = idUser;
      temperaturaJournal.minima = createdTemperatura.minima;
      temperaturaJournal.maxima = createdTemperatura.maxima;
      temperaturaJournal.TemperaturaId = createdTemperatura.id;
      let createdTemperaturaJournal = await this._temperaturaJournalService.create(temperaturaJournal);

      const createdDireccionViento = await this._direccionVientoService.create(direccionViento);
      direccionVientoJournal.IPUser = IPUser;
      direccionVientoJournal.UsuarioId = idUser;
      direccionVientoJournal.h0830 = createdDireccionViento.h0830;
      direccionVientoJournal.h1400 = createdDireccionViento.h1400;
      direccionVientoJournal.h1800 = createdDireccionViento.h1800;
      direccionVientoJournal.DireccionVientoId = createdDireccionViento.id;
      let createdDireccionVientoJournal = await this._direccionVientoJournalService.create(direccionVientoJournal);

      const createdGeotermometro = await this._geotermometroService.create(geotermometro);
      geotermometroJournal.IPUser = IPUser;
      geotermometroJournal.UsuarioId = idUser;
      geotermometroJournal.cm2 = createdGeotermometro.cm2;
      geotermometroJournal.cm5 = createdGeotermometro.cm5;
      geotermometroJournal.cm10 = createdGeotermometro.cm10;
      geotermometroJournal.cm20 = createdGeotermometro.cm20;
      geotermometroJournal.cm50 = createdGeotermometro.cm50;
      geotermometroJournal.cm100 = createdGeotermometro.cm100;
      geotermometroJournal.GeotermometroId = createdGeotermometro.id;
      const createdGeotermometroJournal = await this._geotermometroJournalService.create(geotermometroJournal);

      const createdNubosidad = await this._nubosidadService.create(nubosidad);
      nubosidadJournal.IPUser = IPUser;
      nubosidadJournal.UsuarioId = idUser;
      nubosidadJournal.h0830 = createdNubosidad.h0830;
      nubosidadJournal.h1400 = createdNubosidad.h1400;
      nubosidadJournal.h1800 = createdNubosidad.h1800;
      nubosidadJournal.NubosidadId = createdNubosidad.id;
      const createdNubosidadJournal = await this._nubosidadJournalService.create(nubosidadJournal);

      const createdPresionAtmosferica = await this._presionAtmosfericaService.create(presionAtmosferica);
      presionAtmosfericaJournal.IPUser = IPUser;
      presionAtmosfericaJournal.UsuarioId = idUser;
      presionAtmosfericaJournal.h0830 = createdPresionAtmosferica.h0830;
      presionAtmosfericaJournal.h1400 = createdPresionAtmosferica.h1400;
      presionAtmosfericaJournal.h1800 = createdPresionAtmosferica.h1800;
      presionAtmosfericaJournal.PresionAtmosfericaId = createdPresionAtmosferica.id;
      const createdPresionAtmosfericaJournal = await this._presionAtmosfericaJournalService.create(presionAtmosfericaJournal);

      const createdTermometroHumedo = await this._termometroHumedoService.create(termometroHumedo);
      termometroHumedoJournal.IPUser = IPUser;
      termometroHumedoJournal.UsuarioId = idUser;
      termometroHumedoJournal.h0830 = createdTermometroHumedo.h0830;
      termometroHumedoJournal.h1400 = createdTermometroHumedo.h1400;
      termometroHumedoJournal.h1800 = createdTermometroHumedo.h1800;
      termometroHumedoJournal.TermometroHumedoId = createdTermometroHumedo.id;
      const createdTermometroHumedoJournal = await this._termometroHumedoJournalService.create(termometroHumedoJournal);

      const createdTermometroSeco = await this._termometroSecoService.create(termometroSeco);
      termometroSecoJournal.IPUser = IPUser;
      termometroSecoJournal.UsuarioId = idUser;
      termometroSecoJournal.h0830 = createdTermometroSeco.h0830;
      termometroSecoJournal.h1400 = createdTermometroSeco.h1400;
      termometroSecoJournal.h1800 = createdTermometroSeco.h1800;
      termometroSecoJournal.TermometroSecoId = createdTermometroSeco.id;
      const createdTermometroSecoJournal = await this._termometroSecoJournalService.create(termometroSecoJournal);

      const createdVisibilidad = await this._visibilidadService.create(visibilidad);
      visibilidadJournal.IPUser = IPUser;
      visibilidadJournal.UsuarioId = idUser;
      visibilidadJournal.h0830 = createdVisibilidad.h0830;
      visibilidadJournal.h1400 = createdVisibilidad.h1400;
      visibilidadJournal.h1800 = createdVisibilidad.h1800;
      visibilidadJournal.VisibilidadId = createdVisibilidad.id;
      const createdVisibilidadJournal = await this._visibilidadJournalService.create(visibilidadJournal);

      registro.fecha = fecha;
      registro.TemperaturaId = createdTemperatura.id;
      registro.TermometroHumedoId = createdTermometroHumedo.id;
      registro.TermometroSecoId = createdTermometroSeco.id;
      registro.PresionAtmosfericaId = createdPresionAtmosferica.id;
      registro.DireccionVientoId = createdDireccionViento.id;
      registro.NubosidadId = createdNubosidad.id;
      registro.VisibilidadId = createdVisibilidad.id;
      registro.GeotermometroId = createdGeotermometro.id;
      const createdRegistro = await this._registroService.create(registro);
      registroJournal.IPUser = IPUser;
      registroJournal.UsuarioId = idUser;
      registroJournal.fecha = createdRegistro.fecha;
      registroJournal.agua_caida = createdRegistro.agua_caida;
      registroJournal.evaporamiento = createdRegistro.evaporamiento;
      registroJournal.horas_sol = createdRegistro.horas_sol;
      registroJournal.RegistroId = createdRegistro.id;
      const createdRegistroJournal = await this._registroJournalService.create(registroJournal);

      var reg2 = new Registro2Dto();
      reg2.id = createdRegistro.id;
      reg2.fecha = createdRegistro.fecha;
      reg2.horas_sol = createdRegistro.horas_sol;
      reg2.agua_caida = createdRegistro.agua_caida;
      reg2.evaporamiento = createdRegistro.evaporamiento;
      reg2.Temperatura = createdTemperatura;
      reg2.TermometroHumedo = createdTermometroHumedo;
      reg2.TermometroSeco = createdTermometroSeco;
      reg2.PresionAtmosferica = createdPresionAtmosferica;
      reg2.DireccionViento = createdDireccionViento;
      reg2.Nubosidad = createdNubosidad;
      reg2.Visibilidad = createdVisibilidad;
      reg2.Geotermometro = createdGeotermometro;
      return res.status(201).send({
        payload: reg2
      });

    }
    return res.send({
      payload: r2
    });
  }

  async createRegistro(req, res) {
    const {
      body
    } = req;

    var reg = new Registro2Dto();
    var registro = new RegistroDto();
    var registroJournal = new RegistroJournalDto();
    var temperatura = new TemperaturaDto();
    var temperaturaJournal = new TemperaturaJournalDto();
    var termometroHumedo = new TermometroHumedoDto();
    var termometroSeco = new TermometroSecoDto();
    var presionAtmosferica = new PresionAtmosfericaDto();
    var direccionViento = new DireccionVientoDto();
    var nubosidad = new NubosidadDto();
    var visibilidad = new VisibilidadDto();
    var geotermometro = new GeotermometroDto();

    reg = body;

    temperatura = reg.Temperatura;
    let createdTemperatura = await this._temperaturaService.create(temperatura);

    temperaturaJournal.IPUser = req.header('x-forwarded-for') || req.connection.remoteAddress;
    let token = req.headers.authorization.split(' ')[1];
    let payload = jwt.verify(token, 'secretKey');
    temperaturaJournal.UsuarioId = payload.subject;
    temperaturaJournal.minima = createdTemperatura.minima;
    temperaturaJournal.maxima = createdTemperatura.maxima;
    let createdTemperaturaJournal = await this._temperaturaJournalService.create(temperaturaJournal);

    termometroHumedo = reg.TermometroHumedo;
    const createdTermometroHumedo = await this._termometroHumedoService.create(termometroHumedo);

    termometroSeco = reg.TermometroSeco;
    const createdTermometroSeco = await this._termometroSecoService.create(termometroSeco);

    presionAtmosferica = reg.PresionAtmosferica;
    const createdPresionAtmosferica = await this._presionAtmosfericaService.create(presionAtmosferica);

    direccionViento = reg.DireccionViento;
    const createdDireccionViento = await this._direccionVientoService.create(direccionViento);

    nubosidad = reg.Nubosidad;
    const createdNubosidad = await this._nubosidadService.create(nubosidad);

    visibilidad = reg.Visibilidad;
    const createdVisibilidad = await this._visibilidadService.create(visibilidad);

    geotermometro = reg.Geotermometro;
    const createdGeotermometro = await this._geotermometroService.create(geotermometro);


    registro.fecha = reg.fecha;
    registro.horas_sol = reg.horas_sol;
    registro.agua_caida = reg.agua_caida;
    registro.evaporamiento = reg.evaporamiento;
    registro.TemperaturaId = createdTemperatura.id;
    registro.TermometroHumedoId = createdTermometroHumedo.id;
    registro.TermometroSecoId = createdTermometroSeco.id;
    registro.PresionAtmosfericaId = createdPresionAtmosferica.id;
    registro.DireccionVientoId = createdDireccionViento.id;
    registro.NubosidadId = createdNubosidad.id;
    registro.VisibilidadId = createdVisibilidad.id;
    registro.GeotermometroId = createdGeotermometro.id;
    
    const createdRegistro = await this._registroService.create(registro);
    registroJournal.IPUser = req.header('x-forwarded-for') || req.connection.remoteAddress;
    registroJournal.UsuarioId = payload.subject;
    registroJournal.agua_caida = createdRegistro.agua_caida;
    registroJournal.evaporamiento = createdRegistro.evaporamiento;
    registroJournal.horas_sol = createdRegistro.horas_sol;
    registroJournal.RegistroId = createdRegistro.id;
    const createdRegistroJournal = await this._registroJournalService.create(registroJournal);

    var reg2 = new Registro2Dto();
    reg2.id = createdRegistro.id;
    reg2.fecha = createdRegistro.fecha;
    reg2.horas_sol = createdRegistro.horas_sol;
    reg2.agua_caida = createdRegistro.agua_caida;
    reg2.evaporamiento = createdRegistro.evaporamiento;
    reg2.Temperatura = createdTemperatura;
    reg2.TermometroHumedo = createdTermometroHumedo;
    reg2.TermometroSeco = createdTermometroSeco;
    reg2.PresionAtmosferica = createdPresionAtmosferica;
    reg2.DireccionViento = createdDireccionViento;
    reg2.Nubosidad = createdNubosidad;
    reg2.Visibilidad = createdVisibilidad;
    reg2.Geotermometro = createdGeotermometro;
    return res.status(201).send({
      payload: reg2
    });
  }

  async updateRegistro(req, res) {
    const {
      body
    } = req;
    const {
      id
    } = req.params;

    await this._registroService.update(id, body);
    return res.status(204).send();

  }

  async deleteRegistro(req, res) {
    const {
      id
    } = req.params;

    await this._registroService.delete(id);
    return res.status(204).send();
  }
}

module.exports = RegistroController;