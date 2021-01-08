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
import br.com.erp.model.Tamanho;
import br.com.erp.util.UnidadePersistencia;

@Path("tamanho")
public class TamanhoImp {
	
	@Path("salvar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Tamanho save(Tamanho tamanho) {
		
		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			em.getTransaction().begin();
			if (tamanho.getId() == null) {
				em.persist(tamanho);
			} else {
				em.merge(tamanho);
			}
			em.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		} finally {
			em.close();
		}
		return tamanho;
	}
	
	@Path("obterPorId")
	@POST
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public Tamanho findByID(ParamJson paramJson) {
		EntityManager em = UnidadePersistencia.createEntityManager();
		Tamanho tamanho = null;
		try {
			tamanho = em.find(Tamanho.class, paramJson.getInt1());
		} catch (Exception e) {
			System.err.println(e);
		} finally {
			em.close();
		}
		return tamanho;
	}
	
	@Path("obterTodos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Tamanho> obterTodos() {
		
		
		EntityManager em = UnidadePersistencia.createEntityManager();
		
		List<Tamanho> tamanhos = null;

		try {
			tamanhos = em.createQuery("select a from Tamanho a").getResultList();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			em.close();
		}
		return tamanhos;
	}
	
	@Path("obterTodosAtivos")
	@GET
	@Consumes(MediaType.APPLICATION_JSON + ";charset=utf-8")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public List<Tamanho> obterTodosAtivos() {
		
		EntityManager em = UnidadePersistencia.createEntityManager();

		try {
			return em.createQuery("select a from Tamanho a where a.status = 1").getResultList();
		} catch (Exception e) {
			e.printStackTrace();
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
			Tamanho tamanho = em.find(Tamanho.class, paramJson.getInt1());
			em.getTransaction().begin();
			em.remove(tamanho);
			em.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			em.getTransaction().rollback();
		} finally {
			em.close();
		}

	}
}
