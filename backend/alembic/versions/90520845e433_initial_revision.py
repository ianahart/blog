"""initial revision

Revision ID: 90520845e433
Revises: 701aa7ea6e2d
Create Date: 2022-01-29 13:23:02.401918

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '90520845e433'
down_revision = '701aa7ea6e2d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('post_author_id_fkey', 'post', type_='foreignkey')
    op.create_foreign_key(None, 'post', 'user', ['author_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('tag_post_id_fkey', 'tag', type_='foreignkey')
    op.create_foreign_key(None, 'tag', 'post', ['post_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('token_user_role_id_fkey', 'token', type_='foreignkey')
    op.create_foreign_key(None, 'token', 'user', ['user_role_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'token', type_='foreignkey')
    op.create_foreign_key('token_user_role_id_fkey', 'token', 'user', ['user_role_id'], ['id'])
    op.drop_constraint(None, 'tag', type_='foreignkey')
    op.create_foreign_key('tag_post_id_fkey', 'tag', 'post', ['post_id'], ['id'])
    op.drop_constraint(None, 'post', type_='foreignkey')
    op.create_foreign_key('post_author_id_fkey', 'post', 'user', ['author_id'], ['id'])
    # ### end Alembic commands ###
