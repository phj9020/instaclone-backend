import client from '../client';

export default {
    Mutation: {
        createMovie: (_, { title, year, genre }) => client.movie.create({data: {title,year,genre}}),
        deleteMovie: (_, {id}) => client.movie.delete({where: {id: id}}),
        updateMovie: (_, {id, year}) => client.movie.update({where: {id: id}, data: {year: year}})
    }
}