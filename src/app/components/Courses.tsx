import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Loader2 } from 'lucide-react';
import { Container } from './ds/Container';
import { SectionTitle } from './ds/SectionTitle';
import { listCoursesPublic } from '../../services/portfolioDb';
import type { CourseWithId } from '../../types/portfolio';

export function Courses() {
  const [courses, setCourses] = useState<CourseWithId[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const list = await listCoursesPublic();
      if (!cancelled) {
        setCourses(list);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="cursos" className="relative py-14 sm:py-20 md:py-28 border-t border-[var(--border)]">
      <Container>
        <SectionTitle
          label="Formação"
          title="Cursos"
          subtitle="Trilhas e cursos que compõem a base técnica e continuam em evolução."
        />

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-10 h-10 animate-spin" style={{ color: 'var(--accent-primary)' }} />
          </div>
        ) : courses.length === 0 ? (
          <p className="text-center py-12" style={{ color: 'var(--foreground-muted)' }}>
            Nenhum curso publicado. Adicione itens ativos no painel administrativo.
          </p>
        ) : (
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <motion.article
                key={course.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex flex-col overflow-hidden rounded-xl border bg-card border-border shadow-sm"
              >
                {course.imageUrl?.trim() ? (
                  <div className="relative h-40 shrink-0 overflow-hidden bg-muted">
                    <img
                      src={course.imageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                      width={400}
                      height={160}
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div
                    className="flex h-24 shrink-0 items-center justify-center border-b border-border bg-muted/50"
                    aria-hidden
                  >
                    <span className="text-2xl font-bold text-muted-foreground/40">
                      {course.title.slice(0, 1).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="text-lg font-semibold leading-snug">{course.title}</h3>
                  {course.provider ? (
                    <p className="text-sm text-primary">{course.provider}</p>
                  ) : null}
                  {course.description ? (
                    <p className="text-sm text-muted-foreground line-clamp-4 flex-1">{course.description}</p>
                  ) : null}
                  {course.url?.trim() ? (
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Abrir link
                    </a>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
