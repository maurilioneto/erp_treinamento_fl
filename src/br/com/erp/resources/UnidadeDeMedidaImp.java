package br.com.erp.resources;

import javax.ws.rs.Path;
import java.util.List;

import javax.persistence.EntityManager;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import br.com.erp.json.ParamJson;
import br.com.erp.model.UnidadeDeMedida;
import br.com.erp.util.UnidadePersistencia;

@Path("unidadeDeMedida")
public class UnidadeDeMedidaImp {

	@Path("salvar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public UnidadeDeMedida save(UnidadeDeMedida unidade) {
		
		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			em.getTransaction().begin();
			if (unidade.getId() == null) {
				em.persist(unidade);
			} else {
				em.merge(unidade);
			}
			em.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		} finally {
			em.close();
		}
		return unidade;
	}
	
	@Path("obterPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public UnidadeDeMedida findByID(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		UnidadeDeMedida unidade = null;
		try {
			unidade = em.find(UnidadeDeMedida.class, paramJson.getInt1());
		} catch (Exception e) {
			System.err.println(e);
		} finally {
			em.close();
		}
		return unidade;
	}
	
	@Path("obterTodos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<UnidadeDeMedida> obterTodos() {
		
		EntityManager em = UnidadePersistencia.createEntityManager();
		
		List<UnidadeDeMedida> unidades = null;

		try {
			unidades = em.createQuery("select a from UnidadeDeMedida a").getResultList();
			System.out.println(unidades);
		} catch (Exception e) {

		} finally {
			em.close();
		}
		return unidades;
	}
	
	@Path("obterTodosAtivos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<UnidadeDeMedida> obterTodosAtivos() {
		
		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			return em.createQuery("select a from UnidadeDeMedida a where a.status = 1").getResultList();
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
			UnidadeDeMedida unidade = em.find(UnidadeDeMedida.class, paramJson.getInt1());
			em.getTransaction().begin();
			em.remove(unidade);
			em.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		} finally {
			em.close();
		}

	}
	
}
