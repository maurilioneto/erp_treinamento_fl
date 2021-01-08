package br.com.erp.resources;

import java.util.List;

import javax.persistence.EntityManager;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.com.erp.json.ParamJson;
import br.com.erp.model.Marca;
import br.com.erp.util.UnidadePersistencia;

@Path("marca")
public class MarcaImp {
	
	@Path("salvar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Marca save(Marca marca) {
		
		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			em.getTransaction().begin();
			if (marca.getId() == null) {
				em.persist(marca);
			} else {
				em.merge(marca);
			}
			em.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		} finally {
			em.close();
		}
		return marca;
	}
	
	@Path("obterPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Marca findByID(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		Marca marca = null;
		try {
			marca = em.find(Marca.class, paramJson.getInt1());
		} catch (Exception e) {
			System.err.println(e);
		} finally {
			em.close();
		}
		return marca;
	}
	
	@Path("obterTodos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Marca> obterTodos() {
		
		EntityManager em = UnidadePersistencia.createEntityManager();
		
		List<Marca> marcas = null;

		try {
			marcas = em.createQuery("select a from Marca a").getResultList();
		} catch (Exception e) {

		} finally {
			em.close();
		}
		return marcas;
	}
	
	@Path("obterTodosAtivos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Marca> obterTodosAtivos() {
		
		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			return em.createQuery("select a from Marca a where a.status = 1;").getResultList();
		} catch (Exception e) {
			
		} finally {
			em.close();
		}
		return null;
	}
	
	@Path("removerPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public void remove(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			Marca marca = em.find(Marca.class, paramJson.getInt1());
			em.getTransaction().begin();
			em.remove(marca);
			em.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		} finally {
			em.close();
		}

	}
}
