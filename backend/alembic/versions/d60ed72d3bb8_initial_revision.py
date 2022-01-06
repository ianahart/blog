"""initial revision

Revision ID: d60ed72d3bb8
Revises: bc86bef641bd
Create Date: 2022-01-05 15:35:38.478625

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'd60ed72d3bb8'
down_revision = 'bc86bef641bd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('post', sa.Column('title', sa.String(), nullable=True))
    op.add_column('post', sa.Column('cover_image_filename', sa.String(length=256), nullable=True))
    op.add_column('post', sa.Column('cover_image_path', sa.String(length=256), nullable=True))
    op.add_column('post', sa.Column('content', postgresql.JSON(astext_type=sa.Text()), nullable=True))
    op.alter_column('post', 'slug',
               existing_type=sa.VARCHAR(length=256),
               nullable=True)
    op.drop_column('post', 'text_filename')
    op.drop_column('post', 'image_path')
    op.drop_column('post', 'text_path')
    op.drop_column('post', 'image_filename')
    op.drop_column('post', 'words')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('post', sa.Column('words', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('post', sa.Column('image_filename', sa.VARCHAR(length=256), autoincrement=False, nullable=False))
    op.add_column('post', sa.Column('text_path', sa.VARCHAR(length=256), autoincrement=False, nullable=False))
    op.add_column('post', sa.Column('image_path', sa.VARCHAR(length=256), autoincrement=False, nullable=False))
    op.add_column('post', sa.Column('text_filename', sa.VARCHAR(length=256), autoincrement=False, nullable=False))
    op.alter_column('post', 'slug',
               existing_type=sa.VARCHAR(length=256),
               nullable=False)
    op.drop_column('post', 'content')
    op.drop_column('post', 'cover_image_path')
    op.drop_column('post', 'cover_image_filename')
    op.drop_column('post', 'title')
    # ### end Alembic commands ###
